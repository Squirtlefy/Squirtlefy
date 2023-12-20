import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";
import express from 'express';
import user from '../controllers/user';
import board from '../controllers/board';
import card from '../controllers/card';
import list from '../controllers/list';

const router = express.Router()

// get all users
router.get('/users', 
  user.getAllUsers,
  (req, res) => res.status(200).json(res.locals.users)
)

// get users from a specific board
router.get('/boardUsers/:boardId', 
  user.getUsersByBoard,
  (req, res) => res.status(200).json(res.locals.users)
)

// get all data for a board
router.get('/boardData/:boardId', 
  board.getAllData,
  (req, res) => res.status(200).json(res.locals.data)
)

// update card order
router.patch('/cardOrder',
  card.updateOrder,
  (req, res) => res.sendStatus(200)
)

// update card order
router.patch('/cardOrder',
  card.updateOrder,
  (req, res) => res.sendStatus(200)
)

// update list order
router.patch('/listOrder',
  list.updateOrder,
  (req, res) => res.sendStatus(200)
)

export default router;