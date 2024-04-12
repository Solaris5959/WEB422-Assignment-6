import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate'; // Adjust path as necessary
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState(''); // For confirmation
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            const success = await registerUser(username, password, password2);
            if (success) {
                router.push('/login');  // Redirect to login page after successful registration
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
          <Card className="mt-4" bg="light">
            <Card.Body>
              <h2>Register</h2>
              Register for an account:
            </Card.Body>
          </Card>
          <br />
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Label>User:</Form.Label>
              <Form.Control 
                type="text" 
                id="userName" 
                name="userName" 
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control 
                type="password" 
                id="password2" 
                name="password2" 
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">Register</Button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </Form>
        </>
    );
}
