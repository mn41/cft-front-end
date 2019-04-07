import React, {memo} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WeightliftingIcon from '@material-ui/icons/FitnessCenter';
import CardioIcon from '@material-ui/icons/DirectionsRun';
import WeightMeasurementIcon from '@material-ui/icons/Timeline';
import NutritionIcon from '@material-ui/icons/Restaurant';
import SettingsIcon from '@material-ui/icons/Settings';
import AboutIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import {NavLink} from "react-router-dom";


const drawerWidth = 275;

const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar
    });

function Navigator(props) {

    const { classes } = props;

    return (
        <div className={classes.root}>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
              <div className={classes.toolbar} />
        <List>
                <ListItem button key={'Home'} component={NavLink} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={'Home'} />
                </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key={'Weight Lifting'} component={NavLink} to="/weightlifting">
                <ListItemIcon><WeightliftingIcon /></ListItemIcon>
                <ListItemText primary={'Weight Lifting'} />
            </ListItem>
            <ListItem button key={'Cardio'} component={NavLink} to="/cardio">
                <ListItemIcon><CardioIcon /></ListItemIcon>
                <ListItemText primary={'Cardio'} />
            </ListItem>
            <ListItem button key={'Nutrition'} component={NavLink} to="/nutrition">
                <ListItemIcon><NutritionIcon /></ListItemIcon>
                <ListItemText primary={'Nutrition'} />
            </ListItem>
            <ListItem button key={'Weight Measurement'} component={NavLink} to="/weightMeasurement">
                <ListItemIcon><WeightMeasurementIcon /></ListItemIcon>
                <ListItemText primary={'Weight Measurements'} />
            </ListItem>
        </List>
    </Drawer>
    </div>
    )
}

export default withStyles(styles)(memo(Navigator));