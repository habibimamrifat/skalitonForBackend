import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchfields: string[]) {
    const searchTerm = (this.query?.searchTerm as string) || '';

    // Constructing search query
    const searchQuery = searchfields.map((field) => {
      return {
        [field]: new RegExp(searchTerm, 'i'), // "i" for case-insensitive search
      };
    });

    this.modelQuery = this.modelQuery.find({ $or: searchQuery });

    return this;
  }

  filter() {
    const baseQuery = this.query;
    const modifyAbleQueryObj = { ...baseQuery };

    const dropQueryFields = ['searchTerm', 'limit', 'sort', 'page', 'fields'];
    dropQueryFields.forEach((el) => {
      delete modifyAbleQueryObj[el];
    });

    this.modelQuery = this.modelQuery.find(modifyAbleQueryObj);
    return this;
  }

  sort() {
    let sort = (this.query.sort as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  limit() {
    const limit = Number(this.query?.limit) || 10;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }

  select() {
    let fields = (this.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate() {
    let limit = (this.query.limit as number) || 10;
    let skip = 0;
    let page = (this.query.page as number) || 1;
    this.modelQuery = this.modelQuery.skip(skip);
    return this;
  }
}
export default QueryBuilder