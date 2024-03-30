import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import { ListGroup, Button, Card, Row } from 'react-bootstrap';
import styles from '@/styles/History.module.css'; // Adjust the path as necessary

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = (e, index) => {
        e.stopPropagation();

        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1);
            return x;
        });
    };

    return (
        <div className="mt-5">
            {parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                            {Object.keys(historyItem).map(key => (
                                <>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </>
                            ))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
