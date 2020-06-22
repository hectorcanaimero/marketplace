import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model()
export class Product extends Entity {
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
  description?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'object',
  })
  extras?: object;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'date',
  })
  c_at?: string;

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
