// utils/mapbox.js
import dotenv from 'dotenv';

dotenv.config();

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = mapboxToken;
console.log(process.env.MAPBOX_ACCESS_TOKEN);

export default mapboxgl;