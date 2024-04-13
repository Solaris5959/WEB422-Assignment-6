import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    useEffect(() => {
        updateAtoms();  // Update atoms on initial load
        
        authCheck(router.pathname);

        const handleRouteChange = (url) => {
            authCheck(url);
            updateAtoms();
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [authCheck, router.events, router.pathname, updateAtoms]);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!PUBLIC_PATHS.includes(path) && !localStorage.getItem('token')) {
            console.log(`Redirecting to login because the path ${path} is protected.`);
            router.push('/login');
        }
    }

    return <>{props.children}</>
}
