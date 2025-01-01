// pages/index.js
import Head from 'next/head';
import Map from '../components/map';
import Navbar from '../components/navbar';

function homePage() {
  return (
    <div>
      <Head>
        <title>My App</title>
      </Head>

      <Navbar />

      <div id="map">
        <Map />
      </div>

    </div>
  );
}

function profilePage() {

}

export default homePage;