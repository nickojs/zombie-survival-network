import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../contexts/authContext';
import { Title } from '../../generalStyles';
import * as S from './styles';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';

interface OSRSItem {
  _id: string;
  name: string;
  icon: string;
}

export default () => {
  const [inventory, setInventory] = useState<OSRSItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { messageHandler } = useNotification();

  const { user } = useAuth();
  const { items } = user || { };

  const fetchOSRSItem = (itemId: string) => axios
    .get(`https://api.osrsbox.com/items?where={ "_id": "${itemId}", "duplicate": false }`);

  useEffect(() => {
    if (items) {
      setLoading(true);
      const getArray = items.map((item) => fetchOSRSItem(item.OSRSId));

      Promise.all(getArray)
        .then((res) => {
          res.forEach((each) => {
            const { _items }: { _items: OSRSItem[] } = each.data;
            setInventory((pState) => [...pState, _items[0]]);
          });
        })
        .catch(() => {
          messageHandler('Failed to fecth inventory', NotificationTypes.ERROR);
        })
        .finally(() => { setLoading(false); });
    }
  }, [items]);

  return (
    <div>
      <Title>Inventory</Title>
      <S.InventoryContainer>
        {loading
          ? <p>Loading items...</p>
          : inventory.map((item) => (
            <S.Item>
              <S.ItemImage
                alt={item.name}
                src={`data:image/png;base64,${item.icon}`}
              />
            </S.Item>
          ))}
      </S.InventoryContainer>
    </div>
  );
};
