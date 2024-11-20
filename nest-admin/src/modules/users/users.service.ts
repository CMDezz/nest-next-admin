import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPassword } from '@/auth/hash';
import aqp from 'api-query-params';
import { query } from 'express';
import { queryHandler } from '@/utils/queries';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string): Promise<boolean> => {
    const a = await this.userModel.exists({ email });
    if (a) {
      return true;
    }
    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { address, email, image, name, password, phone } = createUserDto;

    //check email exist
    if (await this.isEmailExist(email)) {
      throw new BadRequestException(`Email is already exist!`);
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      address,
      email,
      image,
      name,
      password: hashedPassword,
      phone,
    });
    return {
      _id: user._id,
    };
  }

  async findAll(query: string) {
    const { pageSize, skip, sort } = queryHandler(query);
    const totalUsers = (await this.userModel.find()).length;
    const totalPage = Math.ceil(totalUsers / pageSize);
    const results = await this.userModel
      .find()
      .select('-password')
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return {
      items: results,
      totalPage,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
