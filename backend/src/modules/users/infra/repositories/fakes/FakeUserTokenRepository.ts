import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private usersToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    this.usersToken.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersToken.find(u => u.token === token);
    return userToken;
  }
}
