import React, { useContext } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import {SongContext} from './App'
import { useParams, useHistory, useState } from 'react-router-dom'

export default function Song() {
  const {songs, setSongs} = useContext(SongContext)
  let {sid} = useParams()
  let s = sid ? songs.find(s => s.id == sid ) : {}
  const history = useHistory()


  
  function isChildrens (data){
    if (data === "Childrens Song")
      return (<Card.Text>Children's Song</Card.Text>)
  }
  return (
    <Container>
      <Row style={{padding: 20 + 'px'}}>
      <Button className="btn btn-secondary btn-sm" onClick={() => history.push('/songs')}>Back to List</Button>
      </Row>
      <Row style={{height: 750 + 'px'}}>
        <Card style={{width: 50 + '%', borderRadius: 30 + 'px'}}>
          <Card.Body>
            <iframe width="100%" height="700" src={s.sheetMusic}></iframe>
          </Card.Body>
        </Card>
        <Col>
          <Row style={{height: 350 + 'px'}}>
            <Card style={{width: 100 + '%', borderRadius: 30 + 'px'}}>
              <Card.Body>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text>{s.original}</Card.Text>
                {isChildrens(s.childrensSong)}
                <Card.Text>Description: {s.description}</Card.Text>
                <Card.Text>Topics: {s.topics}</Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{width: 100 + '%', borderRadius: 30 + 'px'}}>
              <Card.Body>
                <Card.Title>
                  Audio Recording
                </Card.Title>
                <iframe height="330" src={s.video} width="512"></iframe>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Card style={{borderRadius: 30 + 'px'}}>
          <Card.Body>
            <Card.Title>
              The Story Behind the Song
            </Card.Title>
            <Card.Text>
              {s.story}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}