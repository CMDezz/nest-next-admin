import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '@/modules/users/users.service';
import { compareHashedPassword } from '@/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@/modules/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      return null;
    }

    if (!compareHashedPassword(user.password, password)) {
      return null;
    }

    return user;
  }

  async login(user: UserDocument) {
    if (!user) throw new UnauthorizedException();
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
