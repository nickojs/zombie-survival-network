import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiHelpCircle, BiSearchAlt, BiArrowBack } from 'react-icons/bi';

import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import InventoryItems from './inventoryItems';

import * as S from './styles';
import { useTrade } from '../../contexts/tradeContext';

export interface OSRSItem {
  _id: string;
  name: string;
  icon: string;
}

// services
const fetchOSRSItem = (itemId: string) => axios.get(`https://api.osrsbox.com/items?where={ "_id": "${itemId}", "duplicate": false }`);

const fetchOSRSItems = (name: string) => axios
  .get(`https://api.osrsbox.com/items?where={ "$text" :{ "$search": "${name}" }, "duplicate": false }`);

export default () => {
  const [inventory, setInventory] = useState<OSRSItem[]>([]);
  const [searchResult, setSearchResult] = useState<OSRSItem[]>([]);

  const [search, setSearch] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { messageHandler } = useNotification();

  const { tradeState } = useTrade();
  const { trading } = tradeState;

  const { user } = useAuth();
  const { items } = user || { };

  useEffect(() => {
    if (items) {
      setInventory([]);
      setLoading(true);

      const getRequests = items.map((item) => fetchOSRSItem(item.OSRSId));
      Promise.all(getRequests)
        .then((res) => {
          res.forEach((response) => {
            const { data } = response;
            const { _items } = data;
            const uniqueItem = _items[0];
            if (uniqueItem === undefined) return;
            setInventory((pState) => [...pState, uniqueItem]);
          });
        }).catch(() => {
          messageHandler('Failed to fecth inventory data', NotificationTypes.ERROR);
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [items]);

  useEffect(() => {
    if (!search) return;

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
      {!trading && (
        <S.InventoryMenu>
          <S.InventoryMenuItem
            title="Fetch and add items to the inventory"
            onClick={() => setSearchMode(!searchMode)}
          >
            {searchMode ? <BiArrowBack /> : <BiSearchAlt />}
          </S.InventoryMenuItem>

          <S.InventoryMenuItem />
          <S.InventoryMenuItem />

          <S.InventoryMenuItem
            title="A small token of my appreciation to OSRS"
          >
            <BiHelpCircle />
          </S.InventoryMenuItem>
        </S.InventoryMenu>
      )}

      {searchMode && (
        <S.SearchBar
          type="text"
          placeholder="search items"
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading && searchResult.length === 0
        ? <p>Loading items...</p>
        : <InventoryItems items={searchMode ? searchResult : inventory} search={searchMode} />}

    </S.InventoryContainer>
  );
};
