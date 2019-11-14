import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Sidebar = ({ open, sortType, sortTypeHandler, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Sort by
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sortType}
          onChange={sortTypeHandler}
          labelWidth={labelWidth}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'artist'}>Artist</MenuItem>
          <MenuItem value={'setName'}>Collection</MenuItem>
          <MenuItem value={'originalType'}>Creature Type</MenuItem>
        </Select>
      </FormControl>
    </Drawer>
  )
}

Sidebar.propTypes = {
  open: PropTypes.func,
  sortType: PropTypes.string,
  sortTypeHandler: PropTypes.func,
  handleDrawerClose: PropTypes.func
}

export default Sidebar;
