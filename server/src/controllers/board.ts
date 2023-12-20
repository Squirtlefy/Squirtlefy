import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const board = {
  getAllData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get first 100 from res.locals and insert here
      const { boardId } = req.params;
      const data = await pool.query('SELECT scrumBoard.getboarddata($1)', [boardId]);
      res.locals.data = data.rows[0].getboarddata;
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

}

export default board;