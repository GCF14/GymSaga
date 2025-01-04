import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const userMarkerRef = useRef(null); 
  const [map, setMap] = useState(null); 
  const [geolocationEnabled, setGeolocationEnabled] = useState(false); 
  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLongitude(position.coords.longitude);
          setUserLatitude(position.coords.latitude);
          setGeolocationEnabled(true);
          initializeMapWithUserLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          
          console.error('Geolocation error:', error.message);
          initializeDefaultMap(); 
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      initializeDefaultMap(); 
    }
  }, []); 

  const initializeMapWithUserLocation = (latitude, longitude) => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [longitude, latitude],
      zoom: 15.87,
    });

    setMap(mapInstance);

    // Add a marker at the user's location
    userMarkerRef.current = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapInstance);

    
    mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.on('style.load', () => {
      mapInstance.setFog({});
    });
  };

  const initializeDefaultMap = () => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      projection: 'globe',
      zoom: 1,
      center: [30, 15],
    });

    setMap(mapInstance);

    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    geoLocate.on('geolocate', (event) => {
      const { longitude, latitude } = event.coords;
      setUserLongitude(longitude);
      setUserLatitude(latitude);

      
      

    });

    mapInstance.addControl(geoLocate);
    mapInstance.addControl(new mapboxgl.NavigationControl());

    mapInstance.on('style.load', () => {
      mapInstance.setFog({});
      
    });

    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
      const zoom = mapInstance.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif =
            (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapInstance.getCenter();
        center.lng -= distancePerSecond;
        mapInstance.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    mapInstance.on('mousedown', () => {
      userInteracting = true;
    });
    mapInstance.on('dragstart', () => {
      userInteracting = true;
    });

    mapInstance.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();
  };

  const handleFindGymButtonClick = async () => {
    const startTime = performance.now();

    const radius = 1.5; 
    const bbox = calculateBoundingBox(userLongitude, userLatitude, radius);
    const url = `https://api.mapbox.com/search/searchbox/v1/category/fitness_center?access_token=${MAPBOX_ACCESS_TOKEN}&bbox=${bbox.join(',')}&language=en&limit=24`;
    const gymResponse = await fetch(url);
    const gymData = await gymResponse.json();

    console.log(userLongitude);
    console.log(userLatitude);
    console.log('Gyms within 1.5 km radius:', gymData.features);


    if (isNaN(userLongitude) && isNaN(userLatitude)) {
        alert("Please enable geolocation to discover nearby gyms.");
      } else {
        const radius = 1.5; 
        const bbox = calculateBoundingBox(userLongitude, userLatitude, radius);
        const url = `https://api.mapbox.com/search/searchbox/v1/category/fitness_center?access_token=${MAPBOX_ACCESS_TOKEN}&bbox=${bbox.join(',')}&language=en&limit=24`;
    
        try {
            
            const gymResponse = await fetch(url);
            const gymData = await gymResponse.json();
    
          markers.forEach((marker) => {
            marker.remove();
          });
          setMarkers([]);
    
          const markerPromises = gymData.features.map(async (element) => {
            const marker = new mapboxgl.Marker({ color: '#ff0000' })
              .setLngLat(element.geometry.coordinates)
              .addTo(map);
    
            const popupHTML = generatePopupHTML(element); 
            const popup = new mapboxgl.Popup({closeOnClick: true, maxWidth: '300px'})
              .setHTML(popupHTML);
            marker.setPopup(popup);
            setMarkers((prevMarkers) => [...prevMarkers, marker]);

          });
    
          await Promise.all(markerPromises);
    
          console.log('Gyms within 1.5 km radius:', gymData.features);
        } catch (error) {
          console.error('Error:', error);
        }
      }

    
  };

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
        <h1 style="margin-bottom: 20px;">Gym Information</h1>
        <p>Name: ${element.properties.name}</p>
        <p>Full Address: ${element.properties.full_address}</p>
        <p>Additional Information</p>
        <p>Phone Number: ${element.properties.metadata?.phone ?? 'Not available'}</p>
        <p>Opening Hours:</p>
        ${openingHoursHTML}
        <p>Website: ${element.properties.metadata?.website ?? 'Not available'}</p>
    `;

  }

  useEffect(() => {
    const findGymButton = document.getElementById('findGymButton');
    if (findGymButton) {
      findGymButton.addEventListener('click', handleFindGymButtonClick);
    }

    return () => {
      const findGymButton = document.getElementById('findGymButton');
      if (findGymButton) {
        findGymButton.removeEventListener('click', handleFindGymButtonClick);
      }
    };
  }, [handleFindGymButtonClick]);

  return (
    <div>
      <button id="findGymButton">Find Gyms</button>
      <div
        style={{ width: '100%', height: '100vh' }}
        ref={mapContainerRef}
        className="map-container"
      />
    </div>
  );
};

export default MapboxExample;
