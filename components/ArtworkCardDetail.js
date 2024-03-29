import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404} />;
    if (!data) return null;

    return (
        <Card>
            { // only renders if data.primaryImage exists
                data.primaryImage && <Card.Img src={data.primaryImage} />}
            <Card.Title className="p-3">{data.title || 'N/A'}</Card.Title>
            <Card.Text className="p-3">
                <strong>Date: </strong>{data.objectDate || 'N/A'}
                <br />
                <strong>Classification: </strong>{data.classification || 'N/A'}
                <br />
                <strong>Medium: </strong>{data.medium || 'N/A'}

                <br /> <br />

                <strong>Artist: </strong>{data.artistDisplayName || 'N/A'}
                {data.artistDisplayName && (
                    <>
                        {' ( '}
                        <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
                        {' )'}
                    </>
                )}
                <br />
                <strong>Credit Line: </strong>{data.creditLine || 'N/A'}
                <br />
                <strong>Dimensions: </strong>{data.dimensions || 'N/A'}
            </Card.Text>
        </Card>
    )
}