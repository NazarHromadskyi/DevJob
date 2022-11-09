const { Router } = require('express');

const positionRouter = Router();

positionRouter.get('/', (req, res) => {
  res.json('ayo');
});
positionRouter.post('/');

positionRouter.get('/:positionId');
positionRouter.patch('/:positionId');
positionRouter.delete('/:positionId');

module.exports = positionRouter;
