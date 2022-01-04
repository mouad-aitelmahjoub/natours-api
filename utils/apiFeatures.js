class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  filter() {
    //1-a) Filtering
    const queryObj = { ...this.queryStr }

    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach((el) => delete queryObj[el])

    //1-b)Advanced filtering
    let queryPhrase = JSON.stringify(queryObj)
    queryPhrase = queryPhrase.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryPhrase))

    return this
  }

  sort() {
    //2) Sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort("-createdAt")
    }

    return this
  }

  limitFields() {
    //3) Field Limiting
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ")
      this.query = this.query.select(fields)
    } else {
      const fields = "-__v -updatedAt"
      this.query = this.query.select(fields)
    }

    return this
  }

  paginate() {
    //4)Pagination
    const page = this.queryStr.page * 1 || 1
    const limit = this.queryStr.limit * 1 || 20
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = APIFeatures
