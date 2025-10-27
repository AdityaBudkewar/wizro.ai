import commonSqlc from './commonSqlc.js';
import pool from '../../config/config.js';
import dbqueryexecute from '../../utils/dbqueryexecute.js';

export default {
  getStatus(_req, res) {
    dbqueryexecute
      .executeSelect(commonSqlc.getStatus(), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
