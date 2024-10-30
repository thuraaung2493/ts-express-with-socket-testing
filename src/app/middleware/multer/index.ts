import multer from 'multer';

export const singleUpload = (fieldName: string) => multer().single(fieldName);

export const multiUpload = (fieldName: string, max = 10) =>
  multer().array(fieldName, max);

export const upload = (fields: multer.Field[]) => multer().fields(fields);
