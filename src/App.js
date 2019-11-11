import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.magicthegathering.io/v1/cards?type=Creature&pageSize=20'
      );
      setData(result.data.cards);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
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
