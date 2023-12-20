import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const user = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get first 100 from res.locals and insert here
      const users = await pool.query('SELECT scrumBoard.getUsers()');
      console.log(users);
      res.locals.users = users.rows;
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

  getUsersByBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      const users = await pool.query('SELECT scrumBoard.getUsersByBoard($1)', [boardId]);
      console.log(users);
      res.locals.users = users.rows;
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  }
}

export default user;