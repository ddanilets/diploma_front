import { Router as expressRouter } from 'express';

const router = expressRouter();

router.get('/info', (req, res) => {
  res.send('OK');
});

export default router;
