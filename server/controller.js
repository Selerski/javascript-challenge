const getFileFromCache = require('./cache');

function getRampData(req, res, next) {
  const { filename, fields, lowerBound, upperBound } = req.query;
  const { props } = fields;

  const propertyFields = props.split(',');
  const lowerBounds = lowerBound.split(',');
  const upperBounds = upperBound.split(',');

  getFileFromCache(`../data/${filename}`, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    }

    let parsedData = JSON.parse(data);

    let featureNode = parsedData.features;

    featureNode = featureNode.filter(
      ({ geometry }) =>
        upperBounds[0] > geometry.coordinates[0][0][0][0] &&
        upperBounds[1] > geometry.coordinates[0][0][0][1] &&
        lowerBounds[1] < geometry.coordinates[0][0][0][1] &&
        lowerBounds[0] < geometry.coordinates[0][0][0][0]
    );

    for (const i of featureNode) {
      let node = {
        type: i.type,
        geometry: i.geometry,
        id: i.id,
        properties: {}
      };
      for (const j of propertyFields) {
        node.properties[j] = i.properties[j];
      }
      featureNode[i] = node;
    }

    parsedData.features = [...featureNode];

    res.status(200).send(parsedData);
  });
}

module.exports = {getRampData};
