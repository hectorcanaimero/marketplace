import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MangitoDataSource} from '../datasources';
import {Category, Shop, Order} from '../models';
import {CategoryRepository} from './category.repository';
import {OrderRepository} from './order.repository';

export class ShopRepository extends DefaultCrudRepository<
  Shop,
  typeof Shop.prototype.id
> {
  public readonly categories: HasManyRepositoryFactory<
    Category,
    typeof Shop.prototype.id
  >;

  public readonly orders: HasManyRepositoryFactory<Order, typeof Shop.prototype.id>;

  constructor(
    @inject('datasources.mangito') dataSource: MangitoDataSource,
    @repository.getter('CategoryRepository')
    protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Shop, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.categories = this.createHasManyRepositoryFactoryFor(
      'categories',
      categoryRepositoryGetter,
    );
    this.registerInclusionResolver(
      'categories',
      this.categories.inclusionResolver,
    );
  }
}
