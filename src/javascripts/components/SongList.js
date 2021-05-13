import React, { useState, useContext, useEffect } from 'react'
import SongItem from './SongItem'
import { Container, Row, Col, Button, Form, FormControl, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {SongContext} from './App'

export default function SongList (){
  let { songs, setSongs, authenticated, setAuthenticated} = useContext(SongContext)
  const [displayedSongs, setDisplayedSongs] = useState(songs.map(s=>s)) 
  const history = useHistory()
  const handleNewClick = () => history.push('/songs/new')

  const sortBy = (field) => {
    if (field === 'title'){
      songs.sort((a, b) => a[field].localeCompare(b[field]));
      setDisplayedSongs([...songs])
    }else {
      songs.sort((a, b) => a[field] - b[field])
      setDisplayedSongs(songs.map(s => s))
    }
  }

  const searchFor = (text) => {
    setDisplayedSongs(songs.map(s=>s))
    let tempSongs = []
    songs.map((song) => {
      if (song['title'].toLowerCase().includes(text.toLowerCase()) || song['description'].toLowerCase().includes(text.toLowerCase()) || song['topics'].toLowerCase().includes(text.toLowerCase())){
        tempSongs.push(song)
      }
    })
    setDisplayedSongs([...tempSongs])
  }

  return (
    <div className="container">
      <Container>
        <Nav>
          <Nav.Item>
            {authenticated && <Button variant="info" onClick={handleNewClick} style={{margin: 5 + 'px', float: 'left'}}>Add New Song</Button>}
          </Nav.Item>
          <Nav.Item>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{margin: 5 + 'px', width: 25 + 'em'}} onChange={(e) => searchFor(e.target.value)}/>
            </Form>
          </Nav.Item>
            <Form inline>
              <Form.Label>Sort By:</Form.Label>
              <Form.Control as="select"  onChange={(e) => sortBy(e.target.value)}>
                <option defaultValue="" value="dateAdded">Date Posted</option>
                <option value="title">Alphabetical</option>
              </Form.Control>
            </Form>
        </Nav>
      </Container>

      <main>
        <Container>
          <Row>
            {displayedSongs.map(s => {
              return <SongItem key={s.id} song={s} />
            })}
          </Row>
        </Container>
      </main>
    </div>
  )
}