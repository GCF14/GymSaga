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
  

document.getElementById('fixedButton').addEventListener('click', () => {
    console.log('Button Clicked!');
});