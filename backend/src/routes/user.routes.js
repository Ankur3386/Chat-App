import express from 'express'
import { Router } from 'express'
const router =Router()
router.route('/').post(registerUser)
router.route('/login').post(authUser)
export default router