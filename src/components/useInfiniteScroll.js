import { useState, useEffect } from 'react';
import axios from 'axios';
import mockData from '../mockData'

let cancel;

const useInfiniteScroll = () => {
  const [feedData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setFirstLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setLoadMore(true);
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loadMore) {
      return;
    }
    setPage(p => p + 1);
  }, [loadMore]);

  useEffect(() => {
    const fetchData = async () => {
      if(cancel){
        // Cancel the previous request before making a new request
        cancel.cancel();
      }
      cancel = axios.CancelToken.source();

      let term = (searchTerm !== '') ? `&name=${searchTerm}` : '';

      try {
        // const result = await axios(
        //   `https://api.magicthegathering.io/v1/cards?type=Creature${term}&pageSize=20&page=${page}`,
        //   {cancelToken: cancel.token}
        // );
        // if (result.status === 200) {
        //   setData(prevData => [...prevData, ...result.data.cards]);
        // }

        // FIXME - comment this out when it's time to use real server
        setData(mockData.cards);


      } catch (error) {
        throw error;
      } finally {
        setLoadMore(false);
        setFirstLoad(false);
      }
    };

    setFirstLoad(true)
    if (!loadMore && searchTerm !== '') {
      setData([]);
      setPage(1);
    }
    fetchData();
  }, [page, searchTerm]);

  return {loadMore, isLoading, feedData, setSearchTerm};
};

export default useInfiniteScroll;
