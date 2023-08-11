import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getPrinters,
  getPrinter,
  createPrinter,
  updatePrinter,
  deletePrinter,
} from '../controllers/printer.controller.js';
import makerRoutes from '../routes/maker.routes.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { printerSchema } from '../schemas/printer.schema.js';

const router = Router();

router.get('/impresoras', authRequired, getPrinters);
//router.get('/impresoras/:id', authRequired, getPrinter);

router.post(
  '/impresoras',
  authRequired,
  validateSchema(printerSchema),
  createPrinter
);
router.put(
  '/impresoras/:id',
  authRequired,
  validateSchema(printerSchema.partial()),
  updatePrinter
);
router.delete('/impresoras/:id', authRequired, deletePrinter);
//router.use('/impresoras', authRequired, extractType, makerRoutes);

export default router;
