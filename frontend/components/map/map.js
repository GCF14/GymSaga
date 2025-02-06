import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [userLongitude, setUserLongitude] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isDefaultMap, setIsDefaultMap] = useState(true);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLongitude(longitude);
          setUserLatitude(latitude);
          console.log(userLongitude);
          console.log(userLatitude)
          setGeolocationEnabled(true);
          initializeMapWithUserLocation(latitude, longitude, 15.87);
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
  }, []); // Run only on component mount

  const initializeMapWithUserLocation = (latitude, longitude, zoom = 15.87, isDefaultMap) => {
    if (isDefaultMap) {
      // Add a delay if it's the default map
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
  
        const mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [longitude, latitude],
          zoom,
        });
  
        mapInstanceRef.current = mapInstance;
        setIsDefaultMap(false);
  
        userMarkerRef.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(mapInstance);
  
        mapInstance.addControl(new mapboxgl.NavigationControl());
        mapInstance.on('style.load', () => {
          mapInstance.setFog({});
        });
      }, 6000); // Delay in milliseconds (1 second per 1000)
    } else {
      // Initialize the map immediately if it's not the default map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
  
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [longitude, latitude],
        zoom,
      });
  
      mapInstanceRef.current = mapInstance;
      setIsDefaultMap(false);
  
      userMarkerRef.current = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);
  
      mapInstance.addControl(new mapboxgl.NavigationControl());
      mapInstance.on('style.load', () => {
        mapInstance.setFog({});
      });
    }
  };
  

  const initializeDefaultMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      projection: 'globe',
      zoom: 1,
      center: [30, 15],
    });

    mapInstanceRef.current = mapInstance;
    setIsDefaultMap(true);

    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    });

    mapInstance.addControl(geoLocate);
    mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.on('style.load', () => {
      mapInstance.setFog({});
    });

    geoLocate.on('geolocate', (event) => {
      const { longitude, latitude } = event.coords;
      setUserLongitude(longitude);
      setUserLatitude(latitude);
      setGeolocationEnabled(true);
    
      if (isDefaultMap) {
        mapInstanceRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 15.87,
          essential: true,
        });
        initializeMapWithUserLocation(latitude, longitude, 15.87, isDefaultMap);
        setIsDefaultMap(false);
      } else {
        initializeMapWithUserLocation(latitude, longitude, 15.87);
      }
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
    if (isDefaultMap) {
      alert('Please enable geolocation to discover nearby gyms.');
      return;
    }

    const radius = 1.5; // km
    const bbox = calculateBoundingBox(userLongitude, userLatitude, radius);
    const url = `https://api.mapbox.com/search/searchbox/v1/category/fitness_center?access_token=${MAPBOX_ACCESS_TOKEN}&bbox=${bbox.join(',')}&language=en&limit=24`;

    try {
      const gymResponse = await fetch(url);
      const gymData = await gymResponse.json();

      markers.forEach((marker) => marker.remove());
      setMarkers([]);

      const markerPromises = gymData.features.map((element) => {
        const marker = new mapboxgl.Marker({ color: '#ff0000' })
          .setLngLat(element.geometry.coordinates)
          .addTo(mapInstanceRef.current);

        const popupHTML = generatePopupHTML(element);
        const popup = new mapboxgl.Popup({ closeOnClick: true, maxWidth: '300px' })
          .setHTML(popupHTML);
        marker.setPopup(popup);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
       });

      await Promise.all(markerPromises);

      console.log('Gyms within 1.5 km radius:', gymData.features);
    } catch (error) {
      console.error('Error:', error);
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

         
          if (Array.isArray(element.properties.metadata.open_hours.periods)) {
              openingHoursHTML = element.properties.metadata.open_hours.periods.map((period) => {
                  
                  if (period.open && period.open.time && period.close && period.close.time) {
                      const day = days[period.open.day] ?? 'Unknown';
                      const openTime = `${period.open.time.slice(0, 2)}:${period.open.time.slice(2)}`;
                      const closeTime = `${period.close.time.slice(0, 2)}:${period.close.time.slice(2)}`;
                      return `<p>${day}: ${openTime} - ${closeTime}</p>`;
                  }
                  return '<p>Not available</p>';
              }).join('');
          } else {
              openingHoursHTML = '<p>Not available</p>';
          }
      } else {
          openingHoursHTML = '<p>Not available</p>';
      }

      return `
        <h1 style="margin-bottom: 20px;">Gym Information</h1>
        <p>Name: ${element.properties.name}</p>
        <p>Full Address: ${element.properties.full_address}</p>
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
