import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; // Adjust the path as necessary
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import { addToFavourites, removeFromFavourites } from '@/lib/userData'; // Adjust the path as necessary

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        // Update showAdded based on whether objectID is in the favouritesList
        setShowAdded(favouritesList?.includes(objectID));
    }, [favouritesList, objectID]);

    const favouritesClicked = async () => {
        if (showAdded) {
            // Remove from favourites if currently added
            const newFavouritesList = await removeFromFavourites(objectID);
            setFavouritesList(newFavouritesList);
        } else {
            // Add to favourites if not currently added
            const newFavouritesList = await addToFavourites(objectID);
            setFavouritesList(newFavouritesList);
        }
        setShowAdded(!showAdded);
    };

    if (error) return <div>Error loading artwork details.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '20px' }}>
            <Card>
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
                        onClick={favouritesClicked}
                    >
                        {showAdded ? '- Remove Favourite' : '+ Add to Favourite'}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
