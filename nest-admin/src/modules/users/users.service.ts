import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from '@/utils/hash';
import aqp from 'api-query-params';
import { query } from 'express';
import { queryHandler } from '@/utils/queries';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string): Promise<boolean> => {
    const isExist = await this.userModel.exists({ email });
    if (isExist) {
      return true;
    }
    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { address, email, username, image, name, password, phone } =
      createUserDto;

    //check email exist
    if (await this.isEmailExist(email)) {
      throw new BadRequestException(`Email is already exist!`);
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      address,
      email,
      image,
      username,
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

  async findUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async findUserByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      return this.userModel.deleteOne({ _id: id });
    }
    throw new BadRequestException('Invalid id');
  }
}
