import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store.js'; // Ensure correct path
import { addToHistory } from '@/lib/userData'; // Ensure this path is correct
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    function logout() {
        removeToken();
        router.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        setIsExpanded(false); // Collapse the navbar when a search is performed

        // Update the search history by adding the new search term using addToHistory
        const updatedHistory = await addToHistory(`title=true&q=${searchField}`);
        setSearchHistory(updatedHistory);

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
                                <Nav.Link active={router.pathname === "/"} onClick={handleLinkClick}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" legacyBehavior passHref>
                                    <Nav.Link active={router.pathname === "/search"} onClick={handleLinkClick}>Advanced Search</Nav.Link>
                                </Link>
                            )}
                        </Nav>
                        {token ? (
                            <>
                                <Form className="d-flex" onSubmit={handleSubmit}>
                                    <FormControl type="text" name="search" placeholder="Search" className="me-2" />
                                    <Button className="btn btn-success" type="submit">Search</Button>
                                </Form>
                                &nbsp;
                                <Nav>
                                    <NavDropdown title={token.userName || "User Name"} id="nav-dropdown">
                                        <Link href="/favourites" legacyBehavior passHref>
                                            <NavDropdown.Item onClick={handleLinkClick}>Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" legacyBehavior passHref>
                                            <NavDropdown.Item onClick={handleLinkClick}>Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        ) : (
                            <Nav>
                                <Link href="/login" legacyBehavior passHref>
                                    <Nav.Link active={router.pathname === "/login"} onClick={handleLinkClick}>Login</Nav.Link>
                                </Link>
                                <Link href="/register" legacyBehavior passHref>
                                    <Nav.Link active={router.pathname === "/register"} onClick={handleLinkClick}>Register</Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
}
