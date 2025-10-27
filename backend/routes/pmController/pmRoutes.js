import express from 'express';

import pmController from './pmController.js';

const pmRoutes = express.Router();

pmRoutes.route('/getManager').get(pmController.getManager);
pmRoutes.route('/addGroupProjectName').post(pmController.addGroupProjectName);
pmRoutes.route('/getGroupProjectName').get(pmController.getGroupProjectName);
pmRoutes.route('/addProject').post(pmController.addProject);
pmRoutes.route('/getTeamMembers').get(pmController.getTeamMembers);
pmRoutes.route('/getProjects').get(pmController.getProjects);
pmRoutes.route('/getProjectName').get(pmController.getProjectName);
pmRoutes.route('/getTaskStatus').post(pmController.getTaskStatus);
pmRoutes.route('/getTaskTag').post(pmController.getTaskTag);

export default pmRoutes;
