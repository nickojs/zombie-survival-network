import React, { useEffect, useState } from 'react';
import { OSRSItem } from '.';

import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import { useTrade } from '../../contexts/tradeContext';
import useRequest, { Options, State } from '../../hooks/useRequest';
import Item from './item';

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
  const { toggleItem } = useTrade();

  const searchItemFetchHandler = (item: OSRSItem) => {
    if (search) {
      setOptions({
        method: 'POST',
        url: '/inventory/',
        data: { OSRSId: item.id }
      });
    }
  };

  const deleteInventoryItemHandler = (item: OSRSItem) => {
    setOptions({
      method: 'DELETE',
      url: `/inventory/${item.id}`
    });
  };

  const tradeItemHandler = (item: OSRSItem) => {
    toggleItem(item);
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
        <Item
          key={item.id}
          item={item}
          search={search}
          searchClick={searchItemFetchHandler}
          deleteClick={deleteInventoryItemHandler}
          tradeItemClick={tradeItemHandler}
        />
      ))}
    </S.ItemWrapper>
  );
};
