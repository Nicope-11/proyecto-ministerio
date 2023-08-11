import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getStates,
  getState,
  createState,
  updateState,
  deleteState,
} from '../controllers/state.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { stateSchema } from '../schemas/state.schema.js';

const router = Router();

router.get('/estados', authRequired, getStates);
router.get('/estados/:id', authRequired, getState);
router.post('/estados', authRequired, validateSchema(stateSchema), createState);
router.put(
  '/estados/:id',
  authRequired,
  validateSchema(stateSchema.partial()),
  updateState
);
router.delete('/estados/:id', authRequired, deleteState);

export default router;
