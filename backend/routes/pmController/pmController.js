import pmSqlc from './pmSqlc.js';
import pool from '../../config/config.js';
import dbqueryexecute from '../../utils/dbqueryexecute.js';

export default {
  addGroupProjectName(req, res) {
    dbqueryexecute
      .executeSelectObj(pmSqlc.addGroupProjectName(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addProject(req, res) {
    dbqueryexecute
      .executeSelectObj(pmSqlc.addProject(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getGroupProjectName(res) {
    dbqueryexecute
      .executeSelect(pmSqlc.getGroupProjectName(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getManager(res) {
    dbqueryexecute
      .executeSelect(pmSqlc.getManager(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getProjectName(res) {
    dbqueryexecute
      .executeSelect(pmSqlc.getProjectName(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getProjects(res) {
    dbqueryexecute
      .executeSelect(pmSqlc.getProjects(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getTaskStatus(req, res) {
    dbqueryexecute
      .executeSelectObj(pmSqlc.getTaskStatus(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getTaskTag(req, res) {
    dbqueryexecute
      .executeSelectObj(pmSqlc.getTaskTag(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getTeamMembers(res) {
    dbqueryexecute
      .executeSelect(pmSqlc.getTeamMembers(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
