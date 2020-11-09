import 'mapbox-gl/dist/mapbox-gl.css';

import * as localization from '../../data/teamdeville';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import mapboxgl from 'mapbox-gl';

const stylesMap = {
  width: '100vw',
  height: 'calc(100vh - 200px)',
  position: 'relative',
};

const ContactMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const viewport = {
    latitude: 51.984476,
    longitude: 0.56799,
    zoom: 8,
    width: '100vw',
    height: 'calc(100vh - 200px)',
  };

  function addMarkers(mapNew) {
    localization.features.forEach((marker) => {
      const markerEl = document.createElement('div');
      markerEl.classList.add('pinContainer');
      markerEl.innerHTML = '📌';
      markerEl.style.cursor = 'pointer';
      const popUpEl = document.createElement('div');
      popUpEl.classList.add('popUpMap');
      new mapboxgl.Popup(popUpEl, { offset: [12, -10] })
        .setLngLat(marker.geometry.coordinates)
        .setHTML(marker.properties.ADDRESS)
        .addTo(mapNew);
      new mapboxgl.Marker(markerEl, { offset: [12, -10] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(mapNew);
      markerEl.addEventListener('click', () => {
        mapNew.flyTo({
          center: marker.geometry.coordinates,
          zoom: 10,
        });
      });
    });
  }

  const renderMap = useCallback(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoicHJ6ZW1la2xld3RhayIsImEiOiJjazBtem5neDIwOGh6M29xemw0dDk0bzRsIn0.G5qMtr7DtLRQMLFoOjE6nw';
    const initializeMap = () => {
      const mapNew = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0.56799, 51.984476],
        zoom: 8,
      });

      mapNew.on('load', () => {
        setMap(map);
        mapNew.resize();
      });
      addMarkers(mapNew);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    renderMap();
  }, [map, renderMap]);

  return (
    <div style={{ margin: '0 auto', width: '100vw' }}>
      <div
        {...viewport}
        ref={(el) => {
          mapContainer.current = el;
        }}
        style={stylesMap}
      />
    </div>
  );
};

export default ContactMap;
