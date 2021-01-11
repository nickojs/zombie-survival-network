import React, { useEffect, useState } from 'react';
import { OSRSItem } from '.';
import { useTrade } from '../../contexts/tradeContext';
import * as S from './styles';

interface ItemProps {
  item: OSRSItem;
  search: boolean;
  searchClick: (item: OSRSItem) => void;
  deleteClick: (item: OSRSItem) => void;
  tradeItemClick: (item: OSRSItem) => void;
}

export default ({
  item, search, searchClick, deleteClick, tradeItemClick
}: ItemProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
  const { trading } = useTrade();

  const deleteItemHandler = () => {
    if (triggerDelete) deleteClick(item);
    setTriggerDelete(!triggerDelete);
  };

  const showDeleItemHandler = () => { setShow(!show); };

  useEffect(() => {
    if (!triggerDelete) return;

    const timer = setTimeout(() => {
      setTriggerDelete(false);
    }, 1500);

    return () => { clearTimeout(timer); };
  }, [triggerDelete]);

  return (
    <S.Item
      onMouseEnter={showDeleItemHandler}
      onMouseLeave={showDeleItemHandler}
      onClick={trading ? () => tradeItemClick(item) : () => searchClick(item)}
    >
      <S.ItemImage
        alt={item.name}
        title={item.name}
        src={`data:image/png;base64,${item.icon}`}
      />
      {!search && (
        <S.RemoveItem
          show={show ? 1 : 0}
          triggered={triggerDelete ? 1 : 0}
          onClick={deleteItemHandler}
        >
          {triggerDelete ? '!' : 'X'}
        </S.RemoveItem>
      )}
    </S.Item>
  );
};
