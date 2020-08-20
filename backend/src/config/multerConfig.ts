import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

const folderTemp = resolve(__dirname, '..', '..', 'tmp');
export default {
  folderTemp,
  uploadsfolder: resolve(folderTemp, 'uploads'),

  storage: multer.diskStorage({
    destination: folderTemp,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
