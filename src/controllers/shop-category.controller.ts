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
  Category,
} from '../models';
import {ShopRepository} from '../repositories';

export class ShopCategoryController {
  constructor(
    @repository(ShopRepository) protected shopRepository: ShopRepository,
  ) { }

  @get('/shops/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Shop has many Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.shopRepository.categories(id).find(filter);
  }

  @post('/shops/{id}/categories', {
    responses: {
      '200': {
        description: 'Shop model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Shop.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInShop',
            exclude: ['id'],
            optional: ['shopId']
          }),
        },
      },
    }) category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.shopRepository.categories(id).create(category);
  }

  @patch('/shops/{id}/categories', {
    responses: {
      '200': {
        description: 'Shop.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.shopRepository.categories(id).patch(category, where);
  }

  @del('/shops/{id}/categories', {
    responses: {
      '200': {
        description: 'Shop.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.shopRepository.categories(id).delete(where);
  }
}
