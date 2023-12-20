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

router.get('/oneUser/:email', 
  user.getOneUser,
  (req, res) => res.status(200).json(res.locals.user)
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

// add new list
router.post('/createList',
  list.createList,
  (req, res) => res.sendStatus(200)
)

// add a user to card
router.post('/addUserToCard',
  card.addUser,
  (req, res) => res.sendStatus(200)

)

// ----- //

// createUser
router.post('/createUser',
  user.createUser,
  (req, res) => res.sendStatus(200)
)

// createBoard
router.post('/createBoard',
  board.createBoard,
  (req, res) => res.sendStatus(200)
)

// addUserToBoard
router.patch('/addUserToBoard',
  user.addUserToBoard,
  (req, res) => res.sendStatus(200)
)

// removeUserfromBoard
router.patch('/removeUserfromBoard',
  user.removeUserfromBoard,
  (req, res) => res.sendStatus(200)
)

// createCard
router.post('/createCard',
  card.createCard,
  (req, res) => res.sendStatus(200)
)

// deleteCard
router.delete('/deleteCard/:cardId',
  card.deleteCard,
  (req, res) => res.sendStatus(200)
)

export default router;