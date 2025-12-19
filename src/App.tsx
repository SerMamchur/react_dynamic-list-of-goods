import React, { useCallback, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { Good } from './types/Good';

import { getAll, get5First, getRedGoods } from './api/goods';
// or
// import * as goodsAPI from './api/goods';

export const App: React.FC = () => {
  const [selectedGoods, setSelectedGoods] = useState<null | Good[]>(null);

  const handleReloader = useCallback(
    (value: 'all' | 'firstFive' | 'color'): void => {
      if (value === 'all') {
        getAll().then(goods => setSelectedGoods(goods));
      } else if (value === 'firstFive') {
        get5First().then(goods => setSelectedGoods(goods));
      } else if (value === 'color') {
        getRedGoods().then(goods => setSelectedGoods(goods));
      }
    },
    [],
  );

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => {
          handleReloader('all');
        }}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => {
          handleReloader('firstFive');
        }}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => {
          handleReloader('color');
        }}
      >
        Load red goods
      </button>

      {selectedGoods && <GoodsList goods={selectedGoods} />}
    </div>
  );
};
