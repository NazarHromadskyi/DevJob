const { Router } = require('express');

const applicantRouter = Router();

applicantRouter.post('/');

applicantRouter.get('/:applicantId');
applicantRouter.put('/:applicantId');
applicantRouter.delete('/:applicantId');

module.exports = applicantRouter;
