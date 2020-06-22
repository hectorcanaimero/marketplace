import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  c_pedido?: string;

  @property({
    type: 'date',
  })
  c_envio?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'number',
  })
  frete?: number;

  @property({
    type: 'object',
  })
  items?: object;

  @property({
    type: 'string',
  })
  shopId?: string;

  @property({
    type: 'string',
  })
  customerId?: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
