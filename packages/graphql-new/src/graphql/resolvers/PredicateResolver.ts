import { ResolverAdapter } from '~/core/Resolver';
import type { PredicateItem } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import { db } from '~/infra/database/Db';

type Source = PredicateItem;
type Params = {
  predicate: { address: string };
};

class PredicateResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly predicateRepository = new PredicateRepository(
      db.connection(),
    ),
  ) {
    super();
    this.setResolvers({
      Query: {
        predicate: this.predicate.bind(this),
      },
    });
  }

  static create() {
    return new PredicateResolver().getResolvers();
  }

  async predicate(_: Source, params: Params['predicate']) {
    const item = await this.predicateRepository.findByAddress(params.address);
    return item?.toGQLNode();
  }
}

export default PredicateResolver.create();
