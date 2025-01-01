import Head from 'next/head';
import Navbar from '../components/navbar';

function profilePage() {
    return (
        <div>
            <Head>
                <title>Profile Page</title>
            </Head>

            <Navbar />

            <h1>Profile Page</h1>
        </div>
    )
}

export default profilePage;