import React, { useEffect, useState } from 'react';
import { OSRSItem } from '.';

import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import useRequest, { Options, State } from '../../hooks/useRequest';

import * as S from './styles';

interface InventoryItemsProps {
  items: OSRSItem[];
  search: boolean;
}

export default ({ items, search }: InventoryItemsProps) => {
  const [options, setOptions] = useState<Options>(null);
  const [requestData] = useRequest(options);
  const { data, error, loading } = requestData as State;

  const { messageHandler } = useNotification();
  const { updateUser } = useAuth();

  const itemClickHandler = (item: OSRSItem) => {
    if (search) {
      setOptions({
        method: 'POST',
        url: '/inventory/',
        data: {
          OSRSId: item._id,
          qtd: 1
        }
      });
    }
  };

  useEffect(() => {
    if (data) {
      messageHandler(data.message, NotificationTypes.SUCCESS);
      updateUser();
    }
  }, [data]);

  useEffect(() => {
    if (error) messageHandler(error, NotificationTypes.ERROR);
  }, [error]);

  return (
    <S.ItemWrapper disabled={loading ? 1 : 0}>
      {items.map((item) => (
        <S.Item key={item._id} onClick={() => itemClickHandler(item)}>
          <S.ItemImage
            alt={item.name}
            title={item.name}
            src={`data:image/png;base64,${item.icon}`}
          />
        </S.Item>
      ))}
    </S.ItemWrapper>
  );
};
