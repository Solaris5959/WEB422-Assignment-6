import { useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '../lib/authenticate'; // Adjust path as necessary
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store'; // Adjust path as necessary
import { getFavourites, getHistory } from '../lib/userData'; // Adjust path as necessary

import { Card, Form, Button } from "react-bootstrap";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [, setFavouritesList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await authenticateUser(username, password);
            if (success) {
                await updateAtoms();
                router.push('/favourites');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    return (
        <>
            <Card className="mt-4" bg="light">
                <Card.Body>
                    <h2>Login</h2>
                    Enter your login information below:
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                {error && (
                    <div style={{ marginBottom: '38px' }}>
                        <Card bg="danger" text="white">
                            <Card.Body>
                                {error}
                            </Card.Body>
                        </Card>
                    </div>
                )}
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </>
    );
}