import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const card = {
  updateOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cardId, newOrder } = req.query;
      const data = await pool.query('CALL scrumboard.updatecardorder($1, $2)', [cardId, newOrder]);
      // maybe check response for a success?
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

}

export default card;