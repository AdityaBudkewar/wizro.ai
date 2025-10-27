import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import userSqlc from './userSqlc.js';
import pool from '../../config/config.js';
import dbqueryexecute from '../../utils/dbqueryexecute.js';

dotenv.config();

export default {
  deleteUser(req, res) {
    dbqueryexecute
      .executeSelectObj(userSqlc.deleteUser(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  async login(req, res) {
    try {
      const result = await dbqueryexecute.executeSelectObj(
        userSqlc.login(req.body),
        pool,
      );

      if (result.length === 0) {
        return res.status(404).json({ Mess: 'Email/Password not matched' });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        result[0].s_password,
      );

      if (isPasswordValid) {
        const token = jwt.sign(
          { email: result[0].s_email },
          process.env.SECRET_KEY,
          {
            expiresIn: '1d',
          },
        );

        return res.status(200).json({
          email: result[0].s_email,
          empID: result[0].n_user_id,
          fullName: result[0].s_full_name,
          role: result[0].n_role,
          token,
        });
      }

      return res.status(404).json({ Mess: 'Email/Password not matched' });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async register(req, res) {
    try {
      const result = await dbqueryexecute.executeSelectObj(
        userSqlc.getDuplicate(req.body),
        pool,
      );

      if (result.length > 0) {
        return res.status(409).json({ mess: 'Email Already Exists' });
      }

      const SALT = 10;

      const hashedPassword = await bcrypt.hash(req.body.password, SALT);

      const data = await dbqueryexecute.executeSelectObj(
        userSqlc.register({ ...req.body, password: hashedPassword }),
        pool,
      );

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  updateUser(req, res) {
    dbqueryexecute
      .executeSelectObj(userSqlc.updateUser(req.body), pool)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
