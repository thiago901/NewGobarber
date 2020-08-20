import IParseMailTemplate from '../models/IMailTemplateProvider';
// import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeParseMailTemplate implements IParseMailTemplate {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}
