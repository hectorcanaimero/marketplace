import {Entity, hasMany, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {Order} from './order.model';

@model()
export class Shop extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  nit?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  zip?: string;

  @property({
    type: 'object',
  })
  entrega?: object;

  @hasMany(() => Category)
  categories: Category[];

  @hasMany(() => Order)
  orders: Order[];

  constructor(data?: Partial<Shop>) {
    super(data);
  }
}

export interface ShopRelations {
  // describe navigational properties here
}

export type ShopWithRelations = Shop & ShopRelations;
