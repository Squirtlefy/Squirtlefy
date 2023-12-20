import pool from '../database/connection';
import { Request, Response, NextFunction } from "express";
import express from 'express';
import user from '../controllers/user';

const router = express.Router()

// get all users
router.get('/users', 
  user.getAllUsers,
  (req, res) => res.status(200).json(res.locals.users)
)

export default router;