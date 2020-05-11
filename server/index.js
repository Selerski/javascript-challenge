const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/data', require('./router'));

app.use(express.static(path.join(__dirname, '/../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
