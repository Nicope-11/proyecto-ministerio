import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getModels,
  getModel,
  getModelByMaker,
  createModel,
  updateModel,
  deleteModel,
  getModelOrByMaker,
} from '../controllers/model.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { modelSchema, updateModelSchema } from '../schemas/model.schema.js';

const router = Router();

router.get('/:type/modelos', authRequired, getModels);
router.get('/:type/modelos/:id', authRequired, getModelOrByMaker);
//router.get('/:type/modelos/:id', authRequired, getModel);
//router.get('/:type/modelos/:maker', /* authRequired, */ getModelByMaker);
router.post(
  '/:type/modelos',
  authRequired,
  validateSchema(modelSchema),
  createModel
);
router.put(
  '/:type/modelos/:id',
  authRequired,
  validateSchema(updateModelSchema.partial()),
  updateModel
);
router.delete('/:type/modelos/:id', authRequired, deleteModel);

export default router;
