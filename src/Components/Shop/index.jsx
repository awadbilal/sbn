import React from 'react';
import Banner from '../Shared/Banner';
import Filter from './Filter';
import Products from './Products';
import Pagintation from './Pagintation';
import CustomOrder from '../Shared/CustomOrder';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Index() {
  const { state } = useLocation();
  const [filter, setFilter] = useState(state || 'All Products');
  const [sort, setSort] = useState('Popularity');
  const [data, setData] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    // FetchData
    setPageCount(Math.ceil(data.length / 12));
  }, []);

  useEffect(() => {
    console.log('filter has changed ', filter);
    setPageCount(Math.ceil(data.length / 12));
  }, [filter]);

  function prevPage() {
    const slice = data.slice(12 * (page - 2), 12 * (page - 1));
    if (slice.length !== 0) {
      setDataToRender(slice);
      setPage(page - 1);
    }
  }

  function nextPage() {
    const slice = data.slice(12 * page, 12 * (page + 1));
    if (slice.length !== 0) {
      setDataToRender(slice);
      setPage(page + 1);
    }
  }

  return (
    <div id='shop'>
      <Banner title={filter} />
      <Filter
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <Products data={dataToRender} />
      <Pagintation nextPage={nextPage} prevPage={prevPage} />
      <CustomOrder />
    </div>
  );
}

export default Index;
