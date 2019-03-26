import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import NutritionDate from './NutritionDate'
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Meal from './Meal.js'
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

function Nutrition(props) {
    const { classes } = props;
    return (
        <div className={classes.weightlifting}>
        <Grid container spacing={24}>
            <Grid item xs>
                <Typography variant="h4" gutterBottom component="h2" align="center">
                    Nutrition
                </Typography>
            </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={24} justify="space-around">
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addNutrition">  
                    <EditIcon className={classes.editIcon} />
                    &nbsp; Edit Nutrition Entry
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
            <Grid item>
                <NutritionDate/>
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addNutrition ">  
                    <AddIcon className={classes.addIcon} />
                    &nbsp; New Nutrition Entry
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={24} justify="space-around">
            <Grid item xs>
            <Meal name='Breakfast'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Lunch'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Dinner'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Snacks'></Meal>
            </Grid>
        </Grid>
       </div>
    );
}

export default withStyles(styles)(Nutrition);