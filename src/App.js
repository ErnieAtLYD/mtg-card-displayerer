import React, { useState, useEffect } from 'react';
import GridList from '@material-ui/core/GridList';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import MTGCard from './components/MTGCard.js'
import useInfiniteScroll from './components/useInfiniteScroll.js'

import './App.css';

// NOTE:
// For some reason, the MTG API is not honoring either the contains=imageUrl or
// the multiverseid query parameters that would allow to filter out duplicates
// from the API level. I'll need to filter on the component level instead, which
// isn't ideal.

function App() {
  const [feedData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useInfiniteScroll(loadMoreCallback);

  function loadMoreCallback() {
    console.log('loadMoreCallback', loadMore)
    setPage(p => p + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.magicthegathering.io/v1/cards?type=Creature&pageSize=20&page=${page}`
      );
      // console.log('page ' + page)
      setData(prevData => [...prevData, ...result.data.cards]);
      setLoadMore(false);
    };
    fetchData();
  }, [setLoadMore, page]);

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
      }}>
        <GridList>
          {feedData.map(tile => (
            tile.multiverseid &&
            <MTGCard
              key={tile.multiverseid}
              imgurl={tile.imageUrl}
              artist={tile.artist}
              setName={tile.setName}
              originalType={tile.originalType}
              name={tile.name}
            />
          ))}
        </GridList>
      </div>
      {loadMore && <CircularProgress />}
    </div>
  );
}

export default App;
