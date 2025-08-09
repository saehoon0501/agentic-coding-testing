import { Router } from 'express';
import { EntityController } from '../controllers/EntityController';
import { validateEntity } from '../validators/entityValidator';

const router = Router();
const entityController = new EntityController();

// CRUD routes for entities
router.post('/', validateEntity, entityController.create);
router.get('/', entityController.getAll);
router.get('/:id', entityController.getById);
router.put('/:id', validateEntity, entityController.update);
router.delete('/:id', entityController.delete);

export default router;
