import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import WeightliftingDate from './WeightliftingDate'
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import WeightliftingTable from './WeightliftingTable'
import { blue, grey, lightBlue } from '@material-ui/core/colors';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
  });

function Weightlifting(props) {
    const { classes } = props;
    return (
        <div className={classes.weightlifting}>
        <Grid container spacing={24}>
            <Grid item xs>
                <Typography variant="h4" gutterBottom component="h2" align="center">
                    Weightlifting   
                </Typography>
            </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={24} justify="space-around">
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addWeightlifting">  
                    <EditIcon className={classes.editIcon} />
                    Edit Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
            <Grid item>
                <WeightliftingDate/>
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addWeightlifting">  
                    <AddIcon className={classes.addIcon} />
                    New Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
            <WeightliftingTable />
        </Grid>
       </div>
    );
}

export default withStyles(styles)(Weightlifting);