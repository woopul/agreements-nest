import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: User): Promise<User> {
    return await this.save(user);
  }

  async getUserByEmail(email: string) {
    return await this.findOneBy({ email });
  }

  async getUserByVerificationTokenAndEmail(
    verificationToken: string,
    email: string,
  ): Promise<User | undefined> {
    return this.findOne({ where: { email, verificationToken } });
  }
}
