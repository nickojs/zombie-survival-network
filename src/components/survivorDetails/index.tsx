import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { useModules } from '../../contexts/modulesContext';
import { useSurvivor } from '../../contexts/survivorContext';
import { Block, Container, Title } from '../../generalStyles';

export default () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const { survivor } = useSurvivor();
  const { toggleModule } = useModules();
  const { location } = survivor || {};

  useEffect(() => {
    setPosition(null);
    if (location) {
      setPosition({
        lat: location.latitude,
        lng: location.longitude
      } as unknown as LatLng);
    }
  }, [location]);

  return survivor && (
    <Container>
      <Title
        onClick={() => toggleModule('survivor')}
      >
        {survivor?.profile.fullName.split(' ')[0] || survivor.username}
        &apos;s details
      </Title>
      <Block>
        {position && (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '200px' }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
          </MapContainer>
        )}
        {!position && <p>This user hasn&apos;t set his location</p>}
      </Block>
    </Container>
  );
};
