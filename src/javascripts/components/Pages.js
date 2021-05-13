import React from 'react'
import { Jumbotron, Card, Container } from 'react-bootstrap'
import DeanneAbout from '../../images/DeanneAbout.jpg'

export function ErrorNotFound () {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Oops! Page not found</Card.Title>
          <Card.Text>
            This is not the page you are looking for...
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}