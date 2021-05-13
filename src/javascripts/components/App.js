import React, { createContext, useState, useEffect } from 'react'
import SongList from './SongList'
import 'bootstrap'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import {ErrorNotFound} from './Pages'
import SongForm from './SongForm'
import Song from './Song'
import { useCookies } from 'react-cookie'

export const SongContext = createContext()

export default function Main(){
  const [songs, setSongs] = useState() 
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory()

  useEffect(() => {
    if(!songs){
      fetch('/api/songs', {
        method: "GET",
        credentials: 'same-origin'
      })
      .then(response => response.text())
      .then((data) => {
        setSongs(JSON.parse(data, (key, value) => {
          const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
          if(typeof value === 'string' && dateFormat.test(value)){
            return new Date(value)
          }
          return value
        }))
      })
      .catch(console.error)
    }
  })
  if(!songs){
    return <p>Loading...</p>
  }
  return (
    <SongContext.Provider value={{songs, setSongs, authenticated, setAuthenticated}}>
      <Router>
        <Switch>
          <Route exact path="/songs"><SongList/></Route>
          <Route path="/songs/new"><SongForm/></Route>
          <Route path="/songs/:sid/edit"><SongForm/></Route>
          <Route path="/songs/:sid"><Song/></Route>
          <Route path="/"><SongList/></Route>
          <Route path ="*"><ErrorNotFound/></Route>
        </Switch>
      </Router>
    </SongContext.Provider>
  )
}