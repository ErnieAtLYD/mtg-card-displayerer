import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

// The actual MTG card component. Shows the image, and then any of the metadata
// is shown on a Material UI Popover.

const MTGCard = ({ imgurl, artist, setName, originalType, name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => { setAnchorEl(event.currentTarget); }
  const handleClose = () => { setAnchorEl(null); };
  return (
    <GridListTile
      style={{ width: 223, height: 310, margin: 10 }}
    >
      <img alt={name} src={imgurl} />
      <GridListTileBar
        title={name}
        actionIcon={
          <IconButton
            aria-label="Info"
            onClick={handleClick}
            style={{ color: 'rgba(255, 255, 255, 0.54)' }}>
            <InfoIcon />
          </IconButton>
        }
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography variant="body2" style={{ padding: 10 }}>
          {name}<br />
          {originalType}<br />
          {setName}<br />
          Artist: {artist}<br />
        </Typography>
      </Popover>
    </GridListTile>
  )
}
MTGCard.propTypes = {
  imgurl: PropTypes.string,
  artist: PropTypes.string,
  setName: PropTypes.string,
  originalType: PropTypes.string,
  name: PropTypes.string
}

export default MTGCard;
