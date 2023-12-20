import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const list = {
  updateOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { listId, newOrder } = req.body;
      const data = await pool.query('CALL scrumboard.updatelistorder($1, $2)', [listId, newOrder]);
      console.log(data);
      // maybe check for success?
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

}

export default list;