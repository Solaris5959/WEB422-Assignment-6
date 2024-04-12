import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; // Ensure correct path
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { addToHistory } from '@/lib/userData'; // Ensure this path is correct

export default function AdvancedSearch() {
    const { register, handleSubmit } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const submitForm = async (data) => {
        let queryString = `${data.searchBy}=true`;

        if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
        if (data.medium) queryString += `&medium=${data.medium}`;
        queryString += `&isOnView=${data.isOnView ? 'true' : 'false'}`;
        queryString += `&isHighlight=${data.isHighlight ? 'true' : 'false'}`;
        queryString += `&q=${data.q}`;

        // Update the search history by adding the new search term using addToHistory
        const updatedHistory = await addToHistory(queryString);
        setSearchHistory(updatedHistory);

        router.push(`/artwork?${queryString}`);
    };

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                placeholder=""
                                {...register('q')}
                                type="text"
                                name="q"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Search By</Form.Label>
                            <Form.Select {...register('searchBy')}>
                                <option value="title">Title</option>
                                <option value="tags">Tags</option>
                                <option value="artistOrCulture">Artist or Culture</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control
                                placeholder=""
                                {...register('geoLocation')}
                                type="text"
                                name="geoLocation"
                            />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control
                                placeholder=""
                                {...register('medium')}
                                type="text"
                                name="medium"
                            />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="form-check mb-3">
                            <Form.Check
                                {...register('isHighlight')}
                                type="checkbox"
                                name="isHighlight"
                                label="Highlighted"
                            />
                        </Form.Group>
                        <Form.Group className="form-check mb-3">
                            <Form.Check
                                {...register('isOnView')}
                                type="checkbox"
                                name="isOnView"
                                label="Currently on View"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};