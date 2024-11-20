import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order.detal.dto';
import { UpdateOrderDetailDto } from './dto/update-order.detal.dto';

@Injectable()
export class OrderDetailService {
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return 'This action adds a new orderDetail';
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
