let map;
let mapboxAccessToken;
let userMarker;
let isDefaultMap = false;
let markers = [];
let longitude;
let latitude;
let destinationLongitude;
let destinationLatitude;



fetch('/api/mapbox-token')
    .then((response) => response.json())
    .then((data) => {
        mapboxAccessToken = data.token;
        mapboxgl.accessToken = mapboxAccessToken;
    })
    .catch((error) => console.error('Error fetching Mapbox token:', error));

const geoLocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true
});

geoLocate.on('geolocate', (e) => {
    const coordinates = e.coords;
    longitude = coordinates.longitude;
    latitude = coordinates.latitude;
});

function initMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
            async function (position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
    
                if (!map) {
                    map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/fruitpunchsamurai9029/cm50yh9cx00cl01sr685j7gc0',
                        center: [longitude, latitude],
                        zoom: 15.87,
                    });
    
                    map.on('load', () => {
                        originalMapStyle = map.getStyle();
                        originalMapCenter = map.getCenter();
                        originalMapZoom = map.getZoom();
                
                        userMarker = new mapboxgl.Marker()
                            .setLngLat([longitude, latitude])
                            .addTo(map);
                        
                        markers.push(userMarker);
                        map.addControl(new mapboxgl.NavigationControl());
                    });
                    
                } else {
                    map.setCenter([longitude, latitude]);
                    if (userMarker) {
                        userMarker.setLngLat([longitude, latitude]);
                    } else {
                        map.on('load', () => {
                            userMarker = new mapboxgl.Marker()
                                .setLngLat([longitude, latitude])
                                .addTo(map);
                        });
                    }
                }
            },
    
            function (error) {
                console.error('Geolocation error:', error.message);
    
                if (error.code === error.PERMISSION_DENIED ||error.code === error.POSITION_UNAVAILABLE ||error.code === error.TIMEOUT ||
                    error.code === error.UNKNOWN_ERROR) {
    
                        defaultMap();
                }
    
            },
    
            { enableHighAccuracy: true }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

}
    

initMap();


function defaultMap() {

    isDefaultMap = true;

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        projection: 'globe',
        zoom: 1,
        center: [30, 15],
    });

    map.addControl(geoLocate);
    map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', () => {
        map.setFog({});
    });

    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }

    map.on('mousedown', () => {
        userInteracting = true;
    });
    map.on('dragstart', () => {
        userInteracting = true;
    });

    map.on('moveend', () => {
        spinGlobe();
    });

    spinGlobe();
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}


function calculateBoundingBox(longitude, latitude, radius) {
    const R = 6378; // Earth's radius in kilometers
    const latRad = toRad(latitude);
    const lonRad = toRad(longitude);
    const radiusRad = radius / R;

    const minLatitude = Math.asin(Math.sin(latRad) * Math.cos(radiusRad) -
        Math.cos(latRad) * Math.sin(radiusRad) * Math.cos(toRad(0))) * (180 / Math.PI);
    const maxLatitude = Math.asin(Math.sin(latRad) * Math.cos(radiusRad) +
        Math.cos(latRad) * Math.sin(radiusRad) * Math.cos(toRad(0))) * (180 / Math.PI);

    const dLongitude = Math.asin(Math.sin(radiusRad) * Math.sin(toRad(90))) * (180 / Math.PI);

    const minLongitude = longitude - dLongitude;
    const maxLongitude = longitude + dLongitude;

    return [minLongitude, minLatitude, maxLongitude, maxLatitude];
}



document.getElementById('findGymButton').addEventListener('click', async () => {
    const startTime = performance.now();


    if(isNaN(longitude) && isNaN(latitude)) {
        alert("Please enable geolocation to discover nearby gyms.");
    } else {

        map.on('load', () => {
            const mapLoadTime = performance.now(); // Measure time after map load
            console.log(`Map load time: ${mapLoadTime - startTime} ms`);
        });
    
        if (!userMarker) {
            originalMapStyle = 'mapbox://styles/fruitpunchsamurai9029/cm50yh9cx00cl01sr685j7gc0';
            originalMapCenter = [longitude, latitude];
            originalMapZoom = 15.87;
    
            userMarker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
            markers.push(userMarker);
            
        } 
    
        try {
            
    
            const radius = 1.5; 
            const bbox = calculateBoundingBox(longitude, latitude, radius);
    
            const url = `https://api.mapbox.com/search/searchbox/v1/category/fitness_center?access_token=${mapboxAccessToken}&bbox=${bbox.join(',')}&language=en&limit=24`;
    
            const gymResponse = await fetch(url);
            const gymData = await gymResponse.json();
            
            const markerPromises = gymData.features.map(async (element) => {
                const marker = new mapboxgl.Marker({ color: '#ff0000' })
                    .setLngLat(element.geometry.coordinates)
                    .addTo(map);
    
                const popupHTML = generatePopupHTML(element); 
                const popup = new mapboxgl.Popup({closeOnClick: false, maxWidth: '300px'})
                    .setHTML(popupHTML);
    
                marker.setPopup(popup);
                markers.push(marker); 
    
                
                const container = document.createElement('div');
                container.className = "findRouteContainer";
                
                const button = document.createElement('button');
                button.textContent = "Detailed Route";
                button.id = 'findRouteButton'
                container.appendChild(button);
                popup._content.appendChild(container);
    
                button.addEventListener('click', () => {
                    destinationLongitude = element.geometry.coordinates[0];
                    destinationLatitude = element.geometry.coordinates[1];
                    
                    if (map) {
                      map.off();
                      map.remove();
                      map = null;
                    }
                  
                    map = new mapboxgl.Map({
                      container: 'map',
                      style: 'mapbox://styles/fruitpunchsamurai9029/cm55mdtxw004j01rg29w7aawx',
                      center: [longitude, latitude],
                      pitch: 65,
                      zoom: 20,
                    });
                  
                    map.addControl(new mapboxgl.NavigationControl());
                    
                    const directions = new MapboxDirections({
                        accessToken: mapboxgl.accessToken,
                        interactive: false 
                    });

                    directions.setOrigin([longitude, latitude]);
                    directions.setDestination([destinationLongitude, destinationLatitude]);
                    map.addControl(directions, 'top-left');
                    

                    
                  
                    const backButtonId = 'backToMapButton';
                    let backButton = document.getElementById(backButtonId);
                  
                    if (!backButton) {
                      backButton = document.createElement('button');
                      backButton.textContent = 'Back';
                      backButton.id = backButtonId;
                      document.body.appendChild(backButton);
                    }
                  
                    backButton.addEventListener('click', () => {
                        map.removeControl(directions);
                    
                        map.setStyle(originalMapStyle);
                        map.setCenter(originalMapCenter);
                        map.setZoom(originalMapZoom);
                        map.setPitch(0);
                    
                        markers.forEach((marker) => {
                            marker.addTo(map);
                        });
                    
                        
                    
                        backButton.remove();
                    });
                  });
            });
    
            await Promise.all(markerPromises); 
    
            // Used for debugging by keeping track of results
            console.log('Gyms within 1.5 km radius:', gymData.features);
    
            const endTime = performance.now(); // End measuring time
            console.log(`Total execution time: ${endTime - startTime} ms`);
        } catch (error) {
            console.error('Error:', error);
        }

    }
    
  
});
    
  
  

function generatePopupHTML(element) {
    let openingHoursHTML = '';

    
    if (element.properties.metadata?.open_hours && element.properties.metadata.open_hours !== 'Not available') {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        openingHoursHTML = element.properties.metadata.open_hours.periods?.map((period) => {
            const day = days[period.open.day];
            const openTime = `${period.open.time.slice(0, 2)}:${period.open.time.slice(2)}`;
            const closeTime = `${period.close.time.slice(0, 2)}:${period.close.time.slice(2)}`;
            return `<p>${day}: ${openTime} - ${closeTime}</p>`;
        }).join('') || '<p>Opening hours not available.</p>';
    } else {
        openingHoursHTML = '<p>Opening hours not available.</p>';
    }

    return `
        <h1>Gym Information</h1>
        <p>Name: ${element.properties.name}</p>
        <p>Full Address: ${element.properties.full_address}</p>
        <p>Additional Information</p>
        <p>Phone Number: ${element.properties.metadata?.phone ?? 'Not available'}</p>
        <p>Opening Hours:</p>
        ${openingHoursHTML}
        <p>Website: ${element.properties.metadata?.website ?? 'Not available'}</p>
    `;
}
