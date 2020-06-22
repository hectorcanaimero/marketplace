import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Shop, ShopRelations, Category} from '../models';
import {MangitoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoryRepository} from './category.repository';

export class ShopRepository extends DefaultCrudRepository<
  Shop,
  typeof Shop.prototype.id,
  ShopRelations
> {

  public readonly categories: HasManyRepositoryFactory<Category, typeof Shop.prototype.id>;

  constructor(
    @inject('datasources.mangito') dataSource: MangitoDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Shop, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
