import exp from 'constants';
import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";

const card = {
  updateOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cardId, newOrder } = req.body;
      const data = await pool.query('CALL scrumboard.updatecardorder($1, $2)', [cardId, newOrder]);
      // maybe check response for a success?
      return next();
    } catch(e) {
      console.log(e);
      return next(e);
    }
  },

  createCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cardTitle, categoryID } = req.body;
      const result = await pool.query('CALL scrumboard.create_card($1, $2)', [cardTitle, categoryID]);
      console.log(result);
      return res.json(result);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  deleteCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cardId } = req.body;
      const result = await pool.query('CALL scrumboard.delete_card($1)', [cardId]);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  },

  addUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cardId, userId } = req.body;
      const result = await pool.query('CALL scrumboard.add_user_to_card($1, $2)', [cardId, userId]);
      return next();
    } catch (err) {
      return next(err);
    }
  },
}

export default card;