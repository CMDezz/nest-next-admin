import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema:UserSchema
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
