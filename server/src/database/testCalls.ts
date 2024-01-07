import pool from './connection';
import { Request, Response, NextFunction } from "express";

const testQueries = {
  test: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await pool.query('select * from scrumBoard.user');
      console.log(result);
      res.locals.test = result;
      return next();
    } catch(e) {
      return next(e);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get new username from res.locals and insert here
      const result = await pool.query('CALL scrumBoard.createUser($1)');
      console.log(result);
      res.locals.test = result;
      return next();
    } catch(e) {
      return next(e);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get first 100 from res.locals and insert here
      const result = await pool.query('SELECT scrumBoard.getUsers()');
      console.log(result);
      res.locals.test = result;
      return next();
    } catch(e) {
      return next(e);
    }
  }
};

export default testQueries;