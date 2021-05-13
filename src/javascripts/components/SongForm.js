import React, { useContext, useState } from 'react'
import { SongContext } from './App'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import {useFormik} from 'formik'
import { useParams, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
toast.configure()

export function VHelp({message}){
  return <p className="help">{message}</p>
}

const validationSchema = yup.object({
  title: yup.string().required(),
  video: yup.string().url(),
  sheetMusic: yup.string().url().required(),
  original: yup.string(),
  childrensSong: yup.string(),
  story: yup.string(),
  description: yup.string(),
  topics: yup.string()
})

export default function SongForm() {
  let {songs, setSongs, authenticated, setAuthenticated} = useContext(SongContext)
  let {sid} = useParams()

  if(!authenticated){
    document.location = '/login'
    return <></>
  }

  let song = sid ? songs.find(s => s.id == sid) : {}
  let is_new = sid === undefined
  let pageTitle = is_new ? 'Adding a new Song' : 'Editing a song'
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: is_new ? {
      title: "",
      video: "",
      sheetMusic: "",
      original: "Original Composition",
      childrensSong: "Childrens Song",
      story: "",
      dateAdded: new Date(),
      description: "",
      topics: ""
    } : {...song},
    validationSchema,
    onSubmit(values){
      
      fetch(`/api/songs${is_new ? '' : '/' + song.id}`, {
        method: is_new ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then(()=> {
        toast('Successfully submitted', {
          onClose: () => {
            document.location = '/songs'
          }
        })
      }).catch((error) => {
        toast('Failed to submit', {
          onClose: () => {
            document.location = "/songs"
          }
        })
      })
    }
  })

  const history = useHistory()

  return (
    <Container>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <h1>{pageTitle}</h1>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Title:</Form.Label>
          <Col sm={10}>
            <Form.Control name="title" value={values.title} onChange={handleChange}/>
            <VHelp message={errors.title}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Link to Video:</Form.Label>
          <Col sm={10}>
            <Form.Control name="video" value={values.video} onChange={handleChange}/>
            <VHelp message={errors.video}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Link to PDF:</Form.Label>
          <Col sm={10}>
            <Form.Control name="sheetMusic" value={values.sheetMusic} onChange={handleChange}/>
            <VHelp message={errors.sheetMusic}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Description (Key words):</Form.Label>
          <Col sm={10}>
            <Form.Control name="description" value={values.description} onChange={handleChange}/>
            <VHelp message={errors.description}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Topics:</Form.Label>
          <Col sm={10}>
            <Form.Control name="topics" value={values.topics} onChange={handleChange}/>
            <VHelp message={errors.topics}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Song Type:</Form.Label>
          <Col sm={10}>
            <Form.Control as="select" name="original" defaultValue={values.original} onChange={handleChange}> 
              <option>Original Composition</option>
              <option>Arrangement</option>
            </Form.Control>
            <VHelp message={errors.original}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>For Children:</Form.Label>
          <Col sm={10}>
            <Form.Control as="select" name="childrensSong" defaultValue={values.childrensSong} onChange={handleChange}> 
              <option>Childrens Song</option>
              <option>Not Childrens Song</option>
            </Form.Control>
            <VHelp message={errors.childrensSong}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Story Behind the Song:</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} id="story" value={values.story} onChange={handleChange}/>
            <VHelp message={errors.story}/>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" style={{margin: 5 + 'px'}}>
          Submit
        </Button>
        <Button variant="danger" onClick={() => document.location = '/songs'} style={{margin: 5 + 'px'}}>
          Cancel
        </Button>
      </Form>
    </Container>
  )
}