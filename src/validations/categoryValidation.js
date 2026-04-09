import { z } from 'zod';
import { objectId } from './customValidation.js';

export const createCategory = {
  body: z.object({
    name: z.string().min(1),
  }),
};

export const getCategory = {
  params: z.object({
    categoryId: objectId,
  }),
};

export const updateCategory = {
  params: z.object({
    categoryId: objectId,
  }),
  body: z.object({
    name: z.string().min(1),
  }).partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: 'body must have at least 1 field' }
  ),
};

export const deleteCategory = {
  params: z.object({
    categoryId: objectId,
  }),
};