import React, { useEffect, useRef, useState } from 'react';
import Banner from '../Shared/Banner';
import Filter from './Filter';
import Products from './Products';
import Pagintation from './Pagintation';
import CustomOrder from '../Shared/CustomOrder';
import { DATA } from '../../Data/products';
import { useLocation } from 'react-router-dom';

function Index() {
  const { state } = useLocation();
  const [filter, setFilter] = useState(state || 'All Products');
  const [sort, setSort] = useState('Popularity');
  const [data, setData] = useState(DATA);
  const [dataToRender, setDataToRender] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const productsRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setData(DATA);
    setDataToRender(
      DATA.sort((a, b) => (a.orderCount > b.orderCount ? -1 : 1)).slice(0, 12)
    );
    if (DATA.length > 12) setPageCount(Math.ceil(DATA.length / 12));
    else setPageCount(1);
  }, []);

  useEffect(() => {
    let newData = data;
    if (filter !== 'All Products') {
      newData = data.filter((item) => item.category === filter);
      if (newData > 12) setPageCount(Math.ceil(newData.length / 12));
      else setPageCount(1);
    } else newData = data;

    switch (sort) {
      case 'Popularity':
        newData = newData.sort((a, b) =>
          a.orderCount > b.orderCount ? -1 : 1
        );
        break;
      case 'Most Recent':
        newData = newData.sort((a, b) => (a.added > b.added ? -1 : 1));
        break;
      case 'Name':
        newData = newData.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      case 'Price Down':
        newData = newData.sort((a, b) => (a.price > b.price ? -1 : 1));
        break;
      case 'Price Up':
        newData = newData.sort((a, b) => (a.price < b.price ? -1 : 1));
        break;
    }
    setDataToRender(newData.slice(0, 12));
    setPage(1);
  }, [filter, sort]);

  function prevPage() {
    const slice = data.slice(12 * (page - 2), 12 * (page - 1));
    if (slice.length !== 0) {
      setDataToRender(slice);
      productsRef.current.scrollIntoView();
      setPage(page - 1);
    }
  }

  function nextPage() {
    const slice = data.slice(12 * page, 12 * (page + 1));
    if (slice.length !== 0) {
      setDataToRender(slice);
      productsRef.current.scrollIntoView();
      setPage(page + 1);
    }
  }

  return (
    <div id='shop'>
      <Banner title={filter} />
      <Filter
        productsRef={productsRef}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <Products data={dataToRender} />
      <Pagintation
        page={page}
        pageCount={pageCount}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <CustomOrder />
    </div>
  );
}

export default Index;
