import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';

import useRequest, { Options, State } from '../../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../../contexts/notificationContext';
import { useSurvivor } from '../../../contexts/survivorContext';
import { useAuth } from '../../../contexts/authContext';
import { formatPlural } from '../../../helpers/formatFlags';
import Minimize from '../../controls';

import {
  Block, Button, Container, Gradient, Title
} from '../../../generalStyles';
import { ModulesName, useModules } from '../../../contexts/modulesContext';

export default () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const [flagged, setFlagged] = useState<boolean>(false);

  const { messageHandler } = useNotification();
  const { toggleModule } = useModules();
  const { user } = useAuth();
  const { survivor, updateSurvivorList, clearSurvivor } = useSurvivor();
  const { location } = survivor || {};

  const flagSurvivorHandler = () => setOptions({
    method: 'POST',
    url: `user/flag/${survivor?.id}`
  });

  useEffect(() => {
    setPosition(null);
    if (location) {
      setPosition({
        lat: location.latitude,
        lng: location.longitude
      } as unknown as LatLng);
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
      updateSurvivorList();
      setFlagged(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      messageHandler(error, NotificationTypes.ERROR);
      updateSurvivorList();
      setFlagged(false);
    }
  }, [error]);

  useEffect(() => {
    if (survivor) {
      setFlagged(false);

      if (survivor.flags) {
        const isFlagged = survivor.flags.find((flag) => flag.flaggedBy === user?.id);
        if (isFlagged) setFlagged(true);
      }
    }
  }, [survivor]);

  return survivor && (
    <Container>
      <Minimize moduleName="survivor" close={clearSurvivor} />
      <Title>
        {survivor.profile.fullName.split(' ')[0] || survivor.username}
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
        {!position && <p>This survivor hasn&apos;t set his location</p>}
      </Block>
      <Block>
        <Button
          type="button"
          gradient={Gradient.SECONDARY}
          onClick={() => toggleModule(ModulesName.TRADE)}
        >
          Trade items
        </Button>
      </Block>
      <Block>
        {survivor.flags && (
        <p>
          This user
          {' '}
          {formatPlural(survivor.flags.length, 'flagged')}
        </p>
        )}
        <Button
          type="button"
          gradient={Gradient.MAIN}
          loading={loading ? 1 : 0}
          disabled={loading || flagged}
          onClick={flagSurvivorHandler}
        >
          {flagged ? 'Already flagged' : 'Flag survivor'}
        </Button>
      </Block>
    </Container>
  );
};
