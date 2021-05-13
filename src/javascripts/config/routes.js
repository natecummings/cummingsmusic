import express from 'express'

import {indexPage, aboutPage, registerPage, loginPage} from '../controllers/index'
import {allSongsAPI, oneSongAPI, createSongAPI, updateSongAPI, deleteSongAPI} from '../controllers/songs'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'

let router = express.Router()

function isSignedIn(req){
  try{
    jwt.verify(req.cookies.token, APP_SECRET)
    return true
  }catch(err){
    return false
  }
}

function requireSignIn(req, res, next){
  if(isSignedIn(req)){
    next()
  }else{
    res.status(401)
    res.end()
  }
}

export function configureRoutes(app){
  app.all('*', (req, res, next) => {
    app.locals.signedIn = isSignedIn(req)
    next()
  })

  router.get('/', indexPage)
  router.get('/about', aboutPage)
  router.get('/songs*', indexPage)
  router.get('/register', registerPage)
  router.get('/login', loginPage)

  // Song API Endpoints
  router.get('/api/songs', allSongsAPI)
  router.get('/api/songs/:id', oneSongAPI)
  router.post('/api/songs', requireSignIn, createSongAPI)
  router.put('/api/songs/:id', requireSignIn, updateSongAPI)
  router.delete('/api/songs/:id', requireSignIn, deleteSongAPI)

  // User API Endpoints
  router.post('/api/users/register', registerUserAPI)
  router.post('/api/users/login', signUserInAPI)

  app.use('/', router)
}