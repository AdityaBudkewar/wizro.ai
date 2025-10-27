import express from 'express';

import commonController from './commonController.js';

const commonRoutes = express.Router();

commonRoutes.route('/getStatus').get(commonController.getStatus);

export default commonRoutes;
