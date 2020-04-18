import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import router from './router';

export interface ObjectLiteral {
  [key: string]: any;
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/data', router);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
