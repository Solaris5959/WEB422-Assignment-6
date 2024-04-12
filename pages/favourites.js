import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';  // Adjust the path as necessary
import ArtworkCard from '@/components/ArtworkCard';  // Adjust the path as necessary
import { Row, Col, Container } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    // Prevent rendering until favouritesList is initialized
    if (!favouritesList) return null;

    return (
        <Container className="mt-5">
            <h1>Favourites</h1>
            <hr className="mt-2 mb-5"/>
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