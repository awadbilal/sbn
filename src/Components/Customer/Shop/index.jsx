import React, { useEffect, useRef, useState } from 'react';
import Banner from '../../Shared/Banner';
import Filter from './Filter';
import Products from './Products';
import Pagintation from './Pagintation';
import CustomOrder from '../../Shared/CustomOrder';
import { useLocation } from 'react-router-dom';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

function Index() {
  const { state } = useLocation();
  const [filter, setFilter] = useState(state || 'All Products');
  const [sort, setSort] = useState('Popularity');
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [dataToRender, setDataToRender] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const productsRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const DATA = [];
    const q = query(collection(db, 'products'), orderBy('orderCount', 'desc'));

    (async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await DATA.push({ ...doc.data(), docRef: doc.id });
      });
      await setData(DATA);
      await setFilteredData(DATA);
      await setDataToRender(DATA.slice(0, 12));
      if (DATA?.length > 12) await setPageCount(Math.ceil(DATA?.length / 12));
      else await setPageCount(1);
    })();
  }, []);

  useEffect(() => {
    let newData = data;
    if (filter !== 'All Products') {
      newData = data?.filter((item) => item.category === filter);
      if (newData?.length > 12) setPageCount(Math.ceil(newData?.length / 12));
      else setPageCount(1);
    } else {
      newData = data;
      if (data?.length > 12) setPageCount(Math.ceil(data?.length / 12));
    }

    // eslint-disable-next-line default-case
    switch (sort) {
      case 'Popularity':
        newData = newData?.sort((a, b) =>
          a.orderCount > b.orderCount ? -1 : 1
        );
        break;
      case 'Discount':
        newData = newData?.sort((a, b) => (a.discount > b.discount ? -1 : 1));
        break;
      case 'Name':
        newData = newData?.sort((a, b) =>
          a.title?.split(' ')[0] < b.title?.split(' ')[0] ? -1 : 1
        );
        break;
      case 'Price Down':
        newData = newData?.sort((a, b) => (a.price > b.price ? -1 : 1));
        break;
      case 'Price Up':
        newData = newData?.sort((a, b) => (a.price < b.price ? -1 : 1));
        break;
    }
    setFilteredData(newData);
    setDataToRender(newData?.slice(0, 12));
    setPage(1);
  }, [data, filter, sort]);

  const prevPage = (index) => {
    let slice = [];

    if (page === index + 2) {
      slice = filteredData?.slice(12 * (page - 2), 12 * (page - 1));
      if (slice?.length !== 0) {
        setDataToRender(slice);
        setPage(page - 1);
      }
    } else if (page > index + 2) {
      slice = filteredData?.slice(12 * (index + 1), 12 * (index + 2));
      if (slice?.length !== 0) {
        setDataToRender(slice);
        setPage(index + 1);
      }
    }
    productsRef.current.scrollIntoView();
  };

  const nextPage = (index) => {
    let slice = [];

    if (page === index) {
      slice = filteredData?.slice(12 * page, 12 * (page + 1));
      if (slice?.length !== 0) {
        setDataToRender(slice);
        setPage(page + 1);
      }
    } else if (page < index) {
      slice = filteredData?.slice(12 * index, 12 * (index + 1));
      if (slice?.length !== 0) {
        setDataToRender(slice);
        setPage(index + 1);
      }
    }
    productsRef.current.scrollIntoView();
  };

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
