import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getMakers,
  getMaker,
  createMaker,
  updateMaker,
  deleteMaker,
} from '../controllers/maker.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { makerSchema } from '../schemas/maker.schema.js';

const router = Router();

router.get('/:type/fabricantes', authRequired, getMakers);
router.get('/:type/fabricantes/:id', authRequired, getMaker);
router.post(
  '/:type/fabricantes',
  authRequired,
  validateSchema(makerSchema),
  createMaker
);
router.put(
  '/:type/fabricantes/:id',
  authRequired,
  validateSchema(makerSchema.partial()),
  updateMaker
);
router.delete('/:type/fabricantes/:id', authRequired, deleteMaker);

export default router;
