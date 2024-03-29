import '@/styles/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Layout from '../components/Layout';


function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={{
            fetcher: async (url) => {
                const res = await fetch(url);

                if (!res.ok) {
                    const error = new Error('An error occurred while fetching the data.');
                    error.info = await res.json();
                    error.status = res.status;
                    throw error;
                }

                return res.json();
            }
        }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
}

export default MyApp;
