import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, usePersistedAtom } from '../store'; // Adjust the path as necessary
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    const [favouritesList, setFavouritesList] = usePersistedAtom(favouritesAtom, 'favourites');
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);

    const favouritesClicked = () => {
        if (showAdded)
            setFavouritesList(current => current.filter(fav => fav !== objectID));
        else {
            setFavouritesList(current => [...current, objectID]);
        }
        setShowAdded(!showAdded);
    };

    if (error) return <div>Error loading artwork details.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '20px' }}>
            <Card >
                {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
                <Card.Body>
                    <Card.Title>{data.title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {data.objectDate || 'N/A'}
                        <br />
                        <strong>Artist:</strong> {data.artistDisplayName || 'N/A'}
                        <br />
                        <strong>Medium:</strong> {data.medium || 'N/A'}
                        <br />
                        <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
                    </Card.Text>
                    <Button
                        variant={showAdded ? 'primary' : 'outline-primary'}
                        onClick={
                            favouritesClicked
                        }
                    >
                        {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
