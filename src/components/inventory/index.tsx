import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BiHelpCircle, BiSearchAlt, BiArrowBack, BiMove
} from 'react-icons/bi';

import { useAuth } from '../../contexts/authContext';
import { NotificationTypes, useNotification } from '../../contexts/notificationContext';
import InventoryItems from './inventoryItems';

import * as S from './styles';
import { useTrade } from '../../contexts/tradeContext';
import { useDrag } from '../../contexts/dragContext';

export interface OSRSItem {
  id: string;
  name: string;
  icon: string;
}

// services
const fetchOSRSItem = (itemId: string) => axios.get(`https://api.osrsbox.com/items?where={ "id": "${itemId}", "duplicate": false }`);

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
  const { trading, recipientAvailable } = tradeState;

  const { user } = useAuth();
  const { items } = user || { };

  const { toggleDrag } = useDrag();

  useEffect(() => {
    if (items) {
      setInventory([]);
      setLoading(true);

      const getRequests = items.map((item) => fetchOSRSItem(item.OSRSId));
      Promise.all(getRequests)
        .then((res) => {
          setInventory([]);
          res.forEach((response) => {
            const { data } = response;
            const { _items } = data;
            const uniqueItem = _items[0];
            if (!uniqueItem) return;
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

  useEffect(() => {
    if (trading) {
      setSearchMode(false);
      setSearchResult([]);
    }
  }, [trading]);

  return (
    <S.InventoryContainer disabled={trading && !recipientAvailable ? 1 : 0}>
      {!trading && (
        <S.InventoryMenu>
          <S.InventoryMenuSearch
            title="Fetch and add items to the inventory"
            onClick={() => setSearchMode(!searchMode)}
          >
            {searchMode ? <BiArrowBack /> : <BiSearchAlt />}
          </S.InventoryMenuSearch>
          <S.InventoryMenuAbout
            title="A small token of my appreciation to OSRS"
          >
            <BiHelpCircle />
          </S.InventoryMenuAbout>
          <S.InventoryMenuMove
            onMouseEnter={toggleDrag}
            onMouseLeave={toggleDrag}
          >
            <BiMove />
          </S.InventoryMenuMove>
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
