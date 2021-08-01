import { IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export default class PaginationDto {
  @IsNumber()
  public p: number;

  @IsNumber()
  public i: number;

  @IsObject()
  public q?: any;
}