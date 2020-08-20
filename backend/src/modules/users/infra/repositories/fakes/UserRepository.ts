import { uuid } from 'uuidv4';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

export default class UserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);

    return user;
  }

  public async findAllProviders({
    execept_id_user,
  }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;
    if (execept_id_user) {
      users = this.users.filter(u => u.id !== execept_id_user);
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = this.users.findIndex(u => u.id === user.id);
    this.users[findUser] = user;
    return user;
  }
}
