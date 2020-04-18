import getFileFromCache from './cache';
import { ObjectLiteral } from './index';

export default function getRampData(req: any, res: any) {
  const {
    filename: filename,
    fields: fields,
    lowerBound: lowerBound,
    upperBound: upperBound
  }: any = req.query;

  const { props: props }: any = fields;

  const propertyFields = props.split(',');
  const lowerBounds = lowerBound.split(',');
  const upperBounds = upperBound.split(',');

  getFileFromCache(`../data/${filename}`, (err: any, data: any) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    }

    const parsedData: ObjectLiteral = JSON.parse(data);

    let featureNode: any[] = parsedData.features;

    featureNode = featureNode.filter(
      ({ geometry }) =>
        upperBounds[0] > geometry.coordinates[0][0][0][0] &&
        upperBounds[1] > geometry.coordinates[0][0][0][1] &&
        lowerBounds[1] < geometry.coordinates[0][0][0][1] &&
        lowerBounds[0] < geometry.coordinates[0][0][0][0]
    );

    for (const i of featureNode) {
      const node: ObjectLiteral = {
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
