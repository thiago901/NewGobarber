import fs from 'fs';
import path from 'path';

import configUploads from '@config/multerConfig';
import IStorageProvider from '../models/IStorageProvider';

class DiskFileStorage implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(configUploads.folderTemp, file),
      path.resolve(configUploads.uploadsfolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(configUploads.uploadsfolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
export default DiskFileStorage;
