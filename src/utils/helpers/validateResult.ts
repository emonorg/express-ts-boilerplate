import InternalErrorException from '../../exceptions/InternalErrorException';
import { NextFunction } from 'express';

export default function validateRes(condition: boolean, error: any) {
  if (!condition) throw error;
}