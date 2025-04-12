import express from 'express'
import { Router } from 'express'
import auth from '../middlewares/auth.middleware.js'
import { accessChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroupChat } from '../controllers/chat.controllers.js';
const router =Router();
router.route('/').post(auth,accessChat);
router.route('/').get(auth,fetchChat);
router.route('/group').post(auth,createGroupChat);
// //as we are updating an entry from our database tso we will use  put request
router.route('/rename').put(auth,renameGroupChat);
router.route('/groupremove').put(auth,removeFromGroup);
router.route('/groupadd').put(auth,addToGroup);
export default router