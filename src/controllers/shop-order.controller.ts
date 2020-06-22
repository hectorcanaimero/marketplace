import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Shop,
  Order,
} from '../models';
import {ShopRepository} from '../repositories';

export class ShopOrderController {
  constructor(
    @repository(ShopRepository) protected shopRepository: ShopRepository,
  ) { }

  @get('/shops/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Shop has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.shopRepository.orders(id).find(filter);
  }

  @post('/shops/{id}/orders', {
    responses: {
      '200': {
        description: 'Shop model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Shop.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInShop',
            exclude: ['id'],
            optional: ['shopId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.shopRepository.orders(id).create(order);
  }

  @patch('/shops/{id}/orders', {
    responses: {
      '200': {
        description: 'Shop.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.shopRepository.orders(id).patch(order, where);
  }

  @del('/shops/{id}/orders', {
    responses: {
      '200': {
        description: 'Shop.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.shopRepository.orders(id).delete(where);
  }
}
