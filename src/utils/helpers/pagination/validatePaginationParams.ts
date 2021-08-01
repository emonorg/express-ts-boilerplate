import { Request } from 'express';
import PaginationDto from './dtos/pagination.dto';

export default function validatePaginationParams(request: Request): PaginationDto {
  try {
    const pagination: PaginationDto = {
      p: parseInt(request.params.p, 10) - 1,
      i: parseInt(request.params.i, 10),
      q: JSON.parse(request.params.q),
    };
    return pagination;
  } catch (error) {
    throw error;
  }
}