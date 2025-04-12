import express from 'express'
import { Router } from 'express'
import {registerUser,loginUser, allUsers} from '../controllers/user.controllers.js'
const router =Router()
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.middleware.js'
router.route('/').post(upload.single('image'),registerUser).get(auth,allUsers)
router.route('/login').post(loginUser)
export default router