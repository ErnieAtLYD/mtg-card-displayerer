import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loadMore) {
      return;
    }
    console.log('wha?!', loadMore)

    callback(() => {
      console.log('calledback')
    });
  }, [loadMore]);

  const handleScroll = () => {
    if (loadMore) return;
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    console.log('Fetch more list items!');
    setLoadMore(true);
  }

  return [loadMore, setLoadMore];
};

export default useInfiniteScroll;
