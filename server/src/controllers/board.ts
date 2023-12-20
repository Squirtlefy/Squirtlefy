import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const board = {
  getAllBoardData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get first 100 from res.locals and insert here
      const { boardId } = req.params;
      const data = await pool.query('SELECT scrumBoard.getboarddata($1)', [boardId]);
      res.locals.data = data.rows[0].getboarddata[0];
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

  createBoard:  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { new_board_name, original_user_id } = req.query;
      const result = await pool.query('CALL scrumboard.create_Board($1, $2)', [new_board_name, original_user_id]);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default board;