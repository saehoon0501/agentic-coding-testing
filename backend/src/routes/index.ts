import { Router } from 'express';
import entityRoutes from './entityRoutes';

const router = Router();

// API routes
router.use('/entities', entityRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Full-Stack Application API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      entities: '/api/v1/entities'
    }
  });
});

export default router;
