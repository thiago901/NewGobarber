import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IParseMailTemplate {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
