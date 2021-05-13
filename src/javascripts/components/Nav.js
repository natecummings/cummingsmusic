import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default function() {
  return(
    <Navbar bg="info" expand="lg">
      <Navbar.Brand href="/songs">Deanne's Music</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/songs">Music List</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

