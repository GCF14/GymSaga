if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            
            const response = await fetch('/api/mapbox-token');
            const data = await response.json();
            const mapboxAccessToken = data.token;
  
            mapboxgl.accessToken = mapboxAccessToken;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/fruitpunchsamurai9029/cm50yh9cx00cl01sr685j7gc0',
                center: [longitude, latitude],
                zoom: 15.87,
            });
  
            new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
        },

        function (error) {
            handleGeolocationError(error);
        },

        { enableHighAccuracy: true } // This forces the browser to ask for permission if not already granted
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
  
  function handleGeolocationError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        displayDefaultMap();
    } else if (error.code === error.POSITION_UNAVAILABLE) {
        alert("Your location is unavailable.");
    } else if (error.code === error.TIMEOUT) {
        alert("The request to get your location timed out.");
    } else {
        alert("An unknown error occurred.");
    }
  }
  
  function displayDefaultMap() {
    fetch('/api/mapbox-token')
        .then((response) => response.json())
        .then((data) => {
            mapboxgl.accessToken = data.token;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/fruitpunchsamurai9029/cm50yh9cx00cl01sr685j7gc0',
                center: [121.035019, 14.616639],
                zoom: 15.87,
            });
        });
  }
  

document.getElementById('findGymButton').addEventListener('click', () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            try {
                
                const response = await fetch('/api/mapbox-token');
                const data = await response.json();
                const accessToken = data.token;

               
                const radius = 1.5; 
                const bbox = calculateBoundingBox(longitude, latitude, radius);

                
                const url = `https://api.mapbox.com/search/searchbox/v1/category/fitness_center?access_token=${accessToken}&bbox=${bbox.join(',')}&language=en&limit=20`;
                const gymResponse = await fetch(url);
                const gymData = await gymResponse.json();

                console.log('Gyms within 1.5 km radius:', gymData.features);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});




// Function to calculate the bounding box (southwest and northeast corners)
function calculateBoundingBox(lat, lon, radius) {
    const R = 6371; // Earth's radius in kilometers
    const toDeg = (value) => (value * 180) / Math.PI; // Convert radians to degrees
    const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians

    const latR = toRad(lat);
    const lonR = toRad(lon);
    const angularDistance = radius / R; // Angular distance in radians

    // Latitude bounds
    const minLat = latR - angularDistance;
    const maxLat = latR + angularDistance;

    // Longitude bounds (adjusted by latitude)
    const minLon = lonR - angularDistance / Math.cos(latR);
    const maxLon = lonR + angularDistance / Math.cos(latR);

    // Convert back to degrees
    return [toDeg(minLon), toDeg(minLat), toDeg(maxLon), toDeg(maxLat)];
}
