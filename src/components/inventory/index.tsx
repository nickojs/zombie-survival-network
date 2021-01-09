import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiBroadDagger } from 'react-icons/gi';

import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';

import * as S from './styles';

interface OSRSItem {
  _id: string;
  name: string;
  icon: string;
}

const InventoryItems: React.FC<{ items: OSRSItem[], search: boolean }> = ({ items, search }) => {
  const itemClickHandler = () => {
    if (search) {
      console.log('im a search item!');
    }
  };

  return (
    <S.ItemWrapper>
      {items.map((item) => (
        <S.Item key={item._id} onClick={itemClickHandler}>
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

export default () => {
  const [inventory, setInventory] = useState<OSRSItem[]>([]);
  const [searchResult, setSearchResult] = useState<OSRSItem[]>([]);

  const [search, setSearch] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { messageHandler } = useNotification();
  const { user } = useAuth();
  const { items } = user || { };

  const fetchOSRSItem = (itemId: string) => axios
    .get(`https://api.osrsbox.com/items?where={ "_id": "${itemId}", "duplicate": false }`);

  const fetchOSRSItems = (name: string) => axios
    .get(`https://api.osrsbox.com/items?where={ "$text" :{ "$search": "${name}" }, "duplicate": false }`);

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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      const request = await fetchOSRSItems(search);
      const { data } = request;
      const items = data._items.slice(0, 24);
      setSearchResult(items);
      setLoading(false);
    }, 500);

    return () => { clearTimeout(timer); };
  }, [search]);

  return (
    <S.InventoryContainer>

      <S.InventoryMenu>
        <S.InventoryMenuItem
          title="Fetch and add items to the inventory"
          onClick={() => setSearchMode(!searchMode)}
        >
          <GiBroadDagger />
        </S.InventoryMenuItem>
      </S.InventoryMenu>

      {searchMode && (
        <S.SearchBar
          type="text"
          placeholder="search items"
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading
        ? <p>Loading items...</p>
        : <InventoryItems items={searchMode ? searchResult : inventory} search={searchMode} />}

    </S.InventoryContainer>
  );
};
