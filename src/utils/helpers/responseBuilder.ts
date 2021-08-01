export default class ResponseBuilder {
  meta: {
    success: boolean,
    message?: string,
  };
  data: object;
  pagination?: object;

  constructor(meta: { success: boolean, message?: string }, data?: object, pagination?: object) {
    this.meta = meta;
    this.data = data;
    this.pagination = pagination;
  }
}