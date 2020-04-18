import { ObjectLiteral } from './index';
import fs from 'fs';

const fileCache: ObjectLiteral = {};

const getFileFromCache = (filename: string, cb: any): any => {
  if (fileCache[filename]) {
    return cb(null, fileCache[filename]);
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      return cb(err);
    }
    fileCache[filename] = data;
    return cb(null, data);
  });
};

export default getFileFromCache;
