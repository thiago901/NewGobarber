import { Repository, getRepository, Not } from 'typeorm';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    execept_id_user,
  }: IFindAllProviderDTO): Promise<User[]> {
    let users: User[];

    if (execept_id_user) {
      users = await this.ormRepository.find({
        where: {
          id: Not(execept_id_user),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }
}
