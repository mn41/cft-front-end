import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import WeightliftingDate from './WeightliftingDate'
import {NavLink} from "react-router-dom";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LoadIcon from '@material-ui/icons/CloudDownload'
import WeightliftingTable from './WeightliftingTable'
import { blue, grey, lightBlue } from '@material-ui/core/colors';
import axios from 'axios';
import moment from 'moment';
import { URL_STRING } from '../config.js'
import WorkoutForm from './WorkoutForm'

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
    const athleteId = props.id

    const [currentWorkout, setCurrentWorkout] = useState({});
    const [currentDate, setCurrentDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [searchDate, setSearchDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    
    const [isFormOpen, setisFormOpen] = useState(false)
    const [formDate, setFormDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [exercises, setExercises] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {

                var queryDate = moment(currentDate).format("YYYY/MM/DD")
                const result = await axios(
                    URL_STRING + 'workout/dateBetween?startDate=' + queryDate + '&endDate=' + queryDate + '&athleteId=' + athleteId
                );
                const workout = (result.data.length > 0 ? result.data[0] : [])
                setCurrentWorkout(workout)
            
          };
      
        fetchData();
    }, [currentDate]);

    const getWorkout = () => {
        setCurrentDate(searchDate)
    }

    const loadRecentWorkout = () => {
        const fetchData = async () => {

            const result = await axios(
                URL_STRING + 'workout/recent/athlete/' + athleteId
            );
            const workout = result.data[0]
            setCurrentWorkout(workout)
            setCurrentDate(moment(workout.date).format("YYYY-MM-DD"));
        
      };
      fetchData()
    }

    const handleFormOpen = () => {
        setisFormOpen(true)
    }

    const handleFormClose = () => {
        setisFormOpen(false)
    }
    
    return (
        <div >
        <Grid container spacing={24}>
            <Grid item xs>
                <Typography variant="h4" gutterBottom component="h2" align="center">
                    Weightlifting   
                </Typography>
            </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={24} justify="space-around" alignItems="center">
        {!("exercises" in currentWorkout) || currentWorkout.exercises.length == 0 ?
        <Grid item>
            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={loadRecentWorkout}>  
                <LoadIcon/>
                &nbsp; Load Most Recent Workout
            </Button>
            <div className={classes.tableContainer}>
            </div>
        </Grid>

        :
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addWeightlifting">  
                    <EditIcon className={classes.editIcon} />
                    &nbsp; Edit Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
        }
            <Grid item>
                <Grid container spacing={24} justify="center" alignItems="center">
                    <Grid item>
                    <TextField
                        id="date"
                        type="date"
                        label="Select Workout Date"
                        style = {{width: 150}}
                        value={searchDate}
                        className={classes.textField}
                        onChange={e => setSearchDate(e.target.value)}
                        margin="normal"
                    />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={getWorkout}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={handleFormOpen}>  
                    <AddIcon className={classes.addIcon} />
                    &nbsp; New Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
            <WeightliftingTable currentDate={currentDate} currentWorkout={currentWorkout}/>
        </Grid>
        <WorkoutForm isFormOpen={isFormOpen} handleFormClose={handleFormClose} formDate={formDate} setFormDate={setFormDate} title={"Add Workout"}/>
       </div>
    );
}

export default withStyles(styles)(Weightlifting);