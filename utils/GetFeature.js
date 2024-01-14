class GetFeatures {
  constructor(module, query) {
    this.module = module;
    this.page = query.page;
    this.limit = query.limit;
    this.keyword = query.keyword;
    this.sort = query.sort;
    this.fields = query.fields;
    this.queryParams = query;
  }
  Filtre() {
    delete this.queryParams.page;
    delete this.queryParams.limit;
    delete this.queryParams.sort;
    delete this.queryParams.fields;
    delete this.queryParams.keyword;

    const QueryStr = JSON.stringify(this.queryParams);
    const RegQuery = QueryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.queryParams = JSON.parse(RegQuery);

    this.module = this.module.find(this.queryParams);

    return this;
  }
  Pagination(totaleDoucement) {
    const limit = +this.limit || 5;
    const page = +this.page || 1;
    const skip = (page - 1) * limit;
    const lastPage = Math.ceil(totaleDoucement / limit);
    const pagination = {};
    if (page < lastPage) pagination.nextPage = page + 1;
    if (page >= lastPage) pagination.perPage = page - 1;
    pagination.countPage = lastPage ;

    this.module = this.module.find().skip(skip).limit(limit);
    pagination.currentPage = page;
    this.pagination = pagination;
    return this;
  }
  SortBy() {
    if (this.sort) {
      const sortStr = this.sort.split(",").join(" ");
      this.module = this.module.sort(sortStr);
    }

    return this;
  }
  FieldsBy() {
    if (this.fields) {
      const fieldsStr = this.fields.split(",").join(" ");
      this.module = this.module.select(fieldsStr);
    }
    return this;
  }
  SearchBy() {
    if (this.keyword) {
      const query = {};
      query.$or = [{ title: { $regex: this.keyword, $options: "i" } }];
      this.module = this.module.find(query);
    }
    return this;
  }
}

module.exports = GetFeatures;
