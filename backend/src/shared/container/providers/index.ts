import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskFileStorage from './StorageProvider/implementations/DiskFileStorage';

import IMailProvider from './MailProvider/models/IMailProvider';
import FakeMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'DiskFileStorage',
  DiskFileStorage,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(FakeMailProvider),
);
