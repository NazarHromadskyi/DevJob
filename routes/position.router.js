const { Router } = require('express');

const positionRouter = Router();

positionRouter.get('');
positionRouter.post('/');

positionRouter.get('/:positionId');
positionRouter.patch('/:positionId');
positionRouter.delete('/:positionId');

module.exports = positionRouter;
