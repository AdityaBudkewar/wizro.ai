import express from 'express';

import ticketController from './ticketController.js';

const ticketRoutes = express.Router();

ticketRoutes.route('/createTicket').post(ticketController.createTicket);
ticketRoutes.route('/getAllTicket').get(ticketController.getAllTicket);
ticketRoutes
  .route('/getTicketDetailById')
  .post(ticketController.getTicketDetailById);
ticketRoutes.route('/addComment').post(ticketController.addComment);
ticketRoutes.route('/getComments').post(ticketController.getComments);
ticketRoutes.route('/getAttachments').post(ticketController.getAttachments);
ticketRoutes
  .route('/getAllDeveloperName')
  .get(ticketController.getAllDeveloperName);
ticketRoutes
  .route('/updateStatusAndAssign')
  .post(ticketController.updateStatusAndAssign);
ticketRoutes.route('/getAllUsers').get(ticketController.getAllUsers);
ticketRoutes.route('/getMyTickets').post(ticketController.getMyTickets);
ticketRoutes
  .route('/getDashboardStats')
  .get(ticketController.getDashboardStats);
ticketRoutes
  .route('/getDashboardUserStats')
  .get(ticketController.getDashboardUserStats);

export default ticketRoutes;
