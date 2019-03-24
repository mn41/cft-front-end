import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AboutIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1201,
  },
  grow: {
    flexGrow: 1,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  appBar: {
    zIndex: 1201,
  },
});

class TitleBar extends React.Component {

  state = {
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
          <Typography variant="h5" color="inherit">
            Complete Fitness Tracker
          </Typography>
            <section className={classes.rightToolbar}>
                <div>
                    <IconButton color="inherit" aria-label="Edit" component={NavLink} to="/about">
                        <AboutIcon />
                    </IconButton>
                    <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"

                    >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',    
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                    </Menu>
                </div>
              </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBar);
