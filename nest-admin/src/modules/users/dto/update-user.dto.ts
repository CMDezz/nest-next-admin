import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;

  phone: string;
  address: string;
  image: string;
}
