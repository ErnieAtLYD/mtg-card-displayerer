import { useState, useEffect } from 'react';
import axios from 'axios';

let cancel;

const useInfiniteScroll = () => {
  const [feedData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(true);

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

      try {
        const result = await axios(
          `https://api.magicthegathering.io/v1/cards?type=Creature&pageSize=20&page=${page}`,
          {cancelToken: cancel.token}
        );
        if (result.status === 200) {
          setData(prevData => [...prevData, ...result.data.cards]);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoadMore(false);
        setFirstLoad(false);
      }
    };
    fetchData();
  }, [page]);

  return {loadMore, isFirstLoad, feedData};
};

export default useInfiniteScroll;
