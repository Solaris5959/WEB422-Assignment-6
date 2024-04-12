import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import { ListGroup, Button, Card, Row } from 'react-bootstrap';
import { removeFromHistory } from '../lib/userData'; // Ensure this path is correct
import styles from '@/styles/History.module.css'; // Adjust the path as necessary

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    
    if (!searchHistory) return null; // Ensure history is loaded

    let parsedHistory = searchHistory.map(h => {
        let params = new URLSearchParams(h);
        return Object.fromEntries(params.entries());
    });

    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        const updatedHistory = await removeFromHistory(searchHistory[index]);
        setSearchHistory(updatedHistory);
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
