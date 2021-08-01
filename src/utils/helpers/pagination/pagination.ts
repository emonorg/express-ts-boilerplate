import { Matches } from 'class-validator';
import InternalErrorException from '../../../exceptions/InternalErrorException';
import PaginationDto from './dtos/pagination.dto';

export default async function paginate(pagination: PaginationDto, model: any) { 
  try {
    const results = await model.find(pagination.q, '-password -__v')
                               .limit(pagination.i)
                               .skip(pagination.i * pagination.p);
    const resultsCount = await model.countDocuments(pagination.q);
    
    return {
      data: results,
      pagination: {
        currentPage: pagination.p + 1,
        totalPages: Math.ceil(resultsCount / pagination.i),
      },
    };
  } catch (error) {
    throw new InternalErrorException();
  }
}
