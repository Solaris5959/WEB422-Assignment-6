import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MainNav() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        setIsExpanded(false); // Collapse the navbar when a search is performed
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = () => {
        setIsExpanded(false); // Collapse the navbar when a link is clicked
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded} onToggle={handleToggle}>
                <Container>
                    <Navbar.Brand>Connor McDonald</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" legacyBehavior passHref>
                                <Nav.Link onClick={handleLinkClick}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" legacyBehavior passHref>
                                <Nav.Link onClick={handleLinkClick}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <FormControl type="text" name="search" placeholder="Search" className="me-2" />
                            <Button className="btn btn-success" type="submit">Search</Button>
                        </Form>
                        &nbsp;
                        <NavDropdown title="User Name" id="nav-dropdown">
                            <Link href="/favourites" legacyBehavior passHref>
                                <NavDropdown.Item>Favourites</NavDropdown.Item>
                            </Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
}
