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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required()
})

export default function RegisterForm() {
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      message: ""
    },
    validationSchema,
    onSubmit(values){
      fetch('/api/users/register', {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then((response) => {
        if(!response.ok) throw Error('Failed to sign up')
        return response.text()
      }).then(() => {
        toast('Successfully signed up', {
          onClose: () => {
            document.location = "/songs"
          }
        })
      }).catch((error) => {
        toast('Failed to sign up', {
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
        <h1>Sign Up</h1>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>First Name:</Form.Label>
          <Col sm={10}>
            <Form.Control name="firstName" value={values.firstName} onChange={handleChange}/>
            <VHelp message={errors.firstName}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Last Name:</Form.Label>
          <Col sm={10}>
            <Form.Control name="lastName" value={values.lastName} onChange={handleChange}/>
            <VHelp message={errors.lastName}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>Email:</Form.Label>
          <Col sm={10}>
            <Form.Control name="email" value={values.email} onChange={handleChange}/>
            <VHelp message={errors.email}/>
          </Col>
        </Form.Group>

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