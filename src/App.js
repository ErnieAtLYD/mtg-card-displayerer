import React from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import feedData from './feedData';
import MTGCard from './components/MTGCard.js'

import './App.css';

function App() {
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
