const { Router } = require('express');
const { positionController } = require('../controllers');

const positionRouter = Router();

positionRouter.get('/', positionController.getAll);
positionRouter.post('/', positionController.create);

positionRouter.get('/:positionId', positionController.getOneById);
positionRouter.patch('/:positionId', positionController.update);
positionRouter.delete('/:positionId', positionController.delete);

module.exports = positionRouter;
