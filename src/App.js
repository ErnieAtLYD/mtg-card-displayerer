import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import CircularProgress from '@material-ui/core/CircularProgress';


// import feedData from './feedData';
import axios from 'axios';
import MTGCard from './components/MTGCard.js'

import './App.css';

// NOTE:
// For some reason, the MTG API is not honoring either the contains=imageUrl or
// the multiverseid query parameters that would allow to filter out duplicates
// from the API level. I'll need to filter on the component level instead, which
// isn't ideal.

function App() {
  const [feedData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.magicthegathering.io/v1/cards?type=Creature&pageSize=20&page=${page}`
      );
      setData(prevData => [...prevData, ...result.data.cards]);
    };
    fetchData();
    setLoadMore(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      console.log('Fetch more list items!');
      setLoadMore(true);
      setPage(p => p + 1)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {loadMore && <CircularProgress />}
      <Container style={{
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
      </Container>
    </div>
  );
}

export default App;
