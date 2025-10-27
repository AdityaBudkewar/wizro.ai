import ticketSqlc from './ticketSqlc.js';
import pool from '../../config/config.js';
import dbqueryexecute from '../../utils/dbqueryexecute.js';

export default {
  addComment(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.addComment(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  createTicket(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.createTicket(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAllDeveloperName(res) {
    dbqueryexecute
      .executeSelect(ticketSqlc.getAllDeveloperName(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAllTicket(res) {
    dbqueryexecute
      .executeSelect(ticketSqlc.getAllTicket(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAllUsers(res) {
    dbqueryexecute
      .executeSelect(ticketSqlc.getAllUsers(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAttachments(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.getAttachments(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getComments(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.getComments(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getDashboardStats(res) {
    dbqueryexecute
      .executeSelect(ticketSqlc.getDashboardStats(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getDashboardUserStats(res) {
    dbqueryexecute
      .executeSelect(ticketSqlc.getDashboardUserStats(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getMyTickets(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.getMyTickets(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getTicketDetailById(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.getTicketDetailById(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateStatusAndAssign(req, res) {
    dbqueryexecute
      .executeSelectObj(ticketSqlc.updateStatusAndAssign(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
