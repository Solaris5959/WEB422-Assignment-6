import { useAtom } from 'jotai';
import { favouritesAtom, usePersistedAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';
import { Row, Col, Container } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList] = usePersistedAtom(favouritesAtom, 'favourites');
    console.log(favouritesList);

    return (
        <Container className="mt-5">
            <h1>Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                <Row xs={1} md={3} className="g-4">
                    {favouritesList.map((objectID) => (
                        <Col key={objectID}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}