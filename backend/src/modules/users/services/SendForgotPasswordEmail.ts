import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);
    const fileTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Solicitação de recuperaçãod e senha',
      templateData: {
        file: fileTemplate,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
export default SendForgotPasswordEmail;
