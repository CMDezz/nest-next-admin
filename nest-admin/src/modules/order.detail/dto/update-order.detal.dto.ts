import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order.detal.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
