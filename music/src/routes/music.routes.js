import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import musicController from '../controllers/music.controller.js';   
const router = express.Router();




router.post('/playlist', authMiddleware.authArtistMiddleware,musicController.createplaylist);   
export default router;