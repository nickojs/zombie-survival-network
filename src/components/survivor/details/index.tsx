import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';

import useRequest, { Options, State } from '../../../hooks/useRequest';
import { NotificationTypes, useNotification } from '../../../contexts/notificationContext';
import { useSurvivor } from '../../../contexts/survivorContext';
import { useAuth } from '../../../contexts/authContext';
import { formatPlural } from '../../../helpers/formatFlags';
import Minimize from '../../controls';
import Trade from '../../trade';

import {
  Block, Button, Container, Gradient, Title
} from '../../../generalStyles';
import { ModulesName } from '../../../contexts/modulesContext';
import { SocketEvents, useSocket } from '../../../contexts/socketContext';
import { useTrade } from '../../../contexts/tradeContext';

export default () => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const [position, setPosition] = useState<LatLng | null>(null);
  const [flagged, setFlagged] = useState<boolean>(false);
  const [online, setOnline] = useState<boolean>(false);

  const interval = useRef<any>();

  const { messageHandler } = useNotification();
  const { user } = useAuth();
  const { emitEvent, onEvent } = useSocket();
  const { survivor, updateSurvivorList, clearSurvivor } = useSurvivor();
  const { location } = survivor || {};
  const { toggleTrading, tradeState } = useTrade();
  const { trading } = tradeState;

  const tradeHandler = () => toggleTrading(true);

  const flagSurvivorHandler = () => {
    setFlagged(true);
    setOptions({
      method: 'POST',
      url: `user/flag/${survivor?.id}`
    });
  };

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
      interval.current = setInterval(() => {
        emitEvent(SocketEvents.REQUEST_USER_STATUS, { survivor });
      }, 500);
      if (survivor.flags) {
        const isFlagged = survivor.flags.find((flag) => flag.flaggedBy === user?.id);
        if (isFlagged) setFlagged(true);
      }
    }
    return () => { clearInterval(interval.current); };
  }, [survivor]);

  useEffect(() => {
    onEvent(SocketEvents.REQUEST_USER_STATUS, (
      data: { status: boolean }
    ) => setOnline(data.status));
  }, []);

  return survivor && (
    <>
      {trading && <Trade />}
      {!trading && (
        <Container>
          <Minimize moduleName={ModulesName.SURVIVOR} close={clearSurvivor} online={online} />
          <Title>
            {survivor.username}
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
              disabled={!online}
              onClick={tradeHandler}
            >
              {online ? 'Trade Items' : 'Cannot trade items'}
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
      )}
    </>
  );
};
