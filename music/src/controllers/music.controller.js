

import musicModel from '../models/music.model.js';
import playlistModel from '../models/playlist.model.js';

export async function createPlaylist(req, res) {
    try {
        const { title, musics } = req.body;  
    
        const playlist=await playlistModel.create({
            title,
            userId:req.user.id,
            musics
        });
    
        return res.status(201).json({ message: 'Playlist created successfully', playlist });    

    }
    catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error', error: error.message });
    }   
} 

