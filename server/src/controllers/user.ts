import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from 'express';

const user = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get first 100 from res.locals and insert here
      const users = await pool.query('SELECT scrumBoard.getUsers()');
      console.log(users);
      res.locals.users = users.rows;
      return next();
    } catch (e) {
      console.log(e);
      return next(e);
    }
  },

  getUsersByBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      const users = await pool.query('SELECT scrumBoard.getUsersByBoard($1)', [
        boardId,
      ]);
      console.log(users);
      res.locals.users = users.rows;
      return next();
    } catch (e) {
      console.log(e);
      return next(e);
    }
  },

  getOneUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      // const email = 'keidy@gmail.com';
      console.log('email: ', email.slice(1, email.length - 1));
      const user = await pool.query('SELECT scrumBoard.getoneuser($1)', [
        email.slice(1, email.length - 1),
      ]);
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: ', user.rows[0].getoneuser);
      res.locals.user = user.rows[0].getOneUser;
      return next();
    } catch (e) {
      console.log(e);
      return next(e);
    }
  },

  createUser: async (name, email, userId, pictureURL) => {
    try {
      const result = await pool.query(
        'CALL scrumBoard.create_User($1, $2, $3, $4)',
        [name, email, userId, pictureURL]
      );
      return result;
    } catch (err) {
      return -1;
    }
  },

  addUserToBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { board_id, selected_user_ids } = req.body;
      const result = await pool.query(
        'CALL scrumBoard.add_users_to_board($1, $2)',
        [board_id, selected_user_ids]
      );
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  },

  removeUserfromBoard: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { boardId, userId } = req.body;
      const result = await pool.query(
        'CALL scrumBoard.remove_user_from_board($1, $2)',
        [boardId, userId]
      );
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  },
};

export default user;
