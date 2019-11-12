import React, {useState} from 'react';
import GridList from '@material-ui/core/GridList';
import MenuBar from './components/MenuBar.js'
import MTGCard from './components/MTGCard.js'
import useInfiniteScroll from './components/useInfiniteScroll.js'
import _ from 'lodash';
import './App.css';

// NOTE:
// For some reason, the MTG API is not honoring either the contains=imageUrl or
// the multiverseid query parameters that would allow to filter out duplicates
// from the API level. I'll need to filter on the component level instead, which
// isn't ideal.

function App() {

  const { loadMore, isLoading, feedData, setSearchTerm } = useInfiniteScroll();
  const [ sortType, setSortType ] = useState('name')

  const searchTerms = event => {
    // console.log('ping', event.target.value)
    setSearchTerm(event.target.value);
  }

  const sortTypeHandler = event => {
    setSortType(event.target.value);
  };

  return (
    <div className="App">
      <MenuBar
        loadMore={loadMore}
        isLoading={isLoading}
        searchTerms={searchTerms}
        sortType={sortType}
        sortTypeHandler={sortTypeHandler}
      >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
      }}>
        <GridList>
          {_.sortBy(feedData, sortType).map(tile => (
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
      </MenuBar>
    </div>
  );
}

export default App;
