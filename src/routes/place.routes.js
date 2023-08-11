import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/place.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { placeSchema } from '../schemas/place.schema.js';

const router = Router();

router.get('/lugares', authRequired, getPlaces);
router.get('/lugares/:id', authRequired, getPlace);
router.post('/lugares', authRequired, validateSchema(placeSchema), createPlace);
router.put(
  '/lugares/:id',
  authRequired,
  validateSchema(placeSchema.partial()),
  updatePlace
);
router.delete('/lugares/:id', authRequired, deletePlace);

export default router;
