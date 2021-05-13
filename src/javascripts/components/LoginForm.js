import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'

toast.configure()

export function VHelp({message}){
  return <p className="help">{message}</p>
}

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
})

export default function LoginForm() {
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: {
      username: "",
      message: ""
    },
    validationSchema,
    onSubmit(values){
      fetch('/api/users/login', {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then((response) => {
        if(!response.ok) throw Error('Failed to sign in')
        return response.text()
      }).then(() => {
        toast('Successfully signed in', {
          onClose: () => {
            document.location = "/songs"
          }
        })
      }).catch((error) => {
        toast('Failed to sign in', {
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
      <Form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Username:</Form.Label>
          <Col sm={10}>
            <Form.Control name="username" value={values.username} onChange={handleChange}/>
            <VHelp message={errors.username}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Password:</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" name="password" value={values.password} onChange={handleChange}/>
            <VHelp message={errors.password}/>
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