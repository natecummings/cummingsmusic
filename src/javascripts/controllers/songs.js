import {Song} from '../models/song'

// Get /api/songs
export const allSongsAPI = (req, res, next) => {
  Song.find().select().exec((err, songs) => {
    if(err){
      res.json({success: false, message: "Query failed"})
      res.end()
    }else{
      res.write(JSON.stringify(songs))
      res.end()
    }
  })
}

// Get /api/songs/:id
export const oneSongAPI = (req, res, next) => {
  Song.find({_id: req.params.id}).select().exec((err, songs) => {
    if(err){
      res.json({success: false, message: "Query failed"})
      res.end()
    }else{
      res.write(JSON.stringify(songs))
      res.end()
    }
  })
}

// Post /api/songs
export const createSongAPI = (req, res, next) => {
  let song = new Song(req.body)
  song.dateAdded = new Date()
  console.log('I added a song!')
  song.save(err => {
    if(err){
      res.json({success: false, message: "Song creation failed"})
      res.end()
    }else{
      res.end()
    }
  })
}

// Put /api/songs/:id
export const updateSongAPI = (req, res, next) => {
  Song.findOne({_id: req.params.id}).select().exec((err, song) => {
    if(err){
      res.json({success: false, message: "Unable to update song"})
      res.end()
    }else{
      Object.assign(song, req.body)
      song.save(err => {
        if(err){
          res.json({success: false, message: "Unable to update song"})
          res.end()
        }else{
          res.end()
        }
      })
    }
  })
}

// Delete /api/songs/:id
export const deleteSongAPI = (req, res, next) => {
  Song.findOne({_id: req.params.id}).select().exec((err, songs) => {
    if(err){
      res.json({success: false, message: "Unable to delete song"})
      res.end()
    }else{
      Song.findByIdAndDelete(req.params.id, err => {
        if(err){
          res.json({success: false, message: "Unable to delete song"})
          res.end()
        }else{
          res.end()
        }
      })
    }
  })
}