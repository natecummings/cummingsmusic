import React, { useContext, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { SongContext } from './App'
import { useParams, useHistory } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

// Modal styles
const customStyles = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)'
  }
};

function isChildrens (data){
  if (data === "Childrens Song")
    return (<Card.Text>Children's Song</Card.Text>)
}

export default function Song(props){
  const {songs, setSongs, authenticated, setAuthenticated} = useContext(SongContext)
  let [modalOpen, setModalOpen] = useState(false)
  const s = props.song
  const history = useHistory()

  const deleteSong = () => {
    fetch(`/api/songs/${s.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin'
    }).then(() => {
      toast('Successfully deleted', {
        onClose: () => {
          document.location = "/songs"
        }
      })
      setModalOpen(false)
    }).catch((error) => {
      toast("Failed to delete", {
        onClose: () => {
          document.location = '/songs'
        }
      })
    })
  }

  return (
    <>
      <Card style={{width: 40 + '%', margin: 20 + 'px', backgroundColor: '#EBEBEB'}}>
        <Card.Body>
          <Card.Title>{s.title}</Card.Title>
          <Card.Text>{s.original}</Card.Text>
          {isChildrens(s.childrensSong)}
          <Card.Text>Description: {s.description}</Card.Text>
          <Card.Text>Topics: {s.topics}</Card.Text>
          <Button className="btn btn-primary btn-sm" onClick={() => history.push(`/songs/${s.id}`)} style={{margin: 5 + 'px'}}>Select</Button>
          {authenticated &&
            <>
            <Button className="btn btn-secondary btn-sm" onClick={() => history.push(`/songs/${s.id}/edit`)} style={{margin: 5 + 'px'}}>Edit</Button>
            <Button className="btn btn-danger btn-sm" style={{margin: 5 + 'px'}} onClick={() => {setModalOpen(true)}}>Delete</Button>
            </>
          }
          
        </Card.Body>
      </Card>

      <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)} style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to delete this song?</p>
        <Button className="btn btn-danger btn-sm" onClick={deleteSong} style={{margin: 5 + 'px'}}>Confirm Delete</Button>
        <Button className="btn btn-primary btn-sm" onClick={() => setModalOpen(false)} style={{margin: 5 + 'px'}}>Cancel</Button>
      </Modal>
    </>
  )
}