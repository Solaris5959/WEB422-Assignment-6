import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MainNav() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
                <Container>
                    <Navbar.Brand>Connor McDonald</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" legacyBehavior passHref>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/search" legacyBehavior passHref>
                            <Nav.Link>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <FormControl type="text" name="search" placeholder="Search" className="me-2" />
                        <Button className="btn btn-success" type="submit">Search</Button>
                    </form>
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
};