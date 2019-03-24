import React,{ useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
//import WeightMeasurementDate from './WeightMeasurementDate'
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import { blue, grey, lightBlue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import WeightMeasurementGraph from './WeightMeasurementGraph';
import moment from 'moment';
import axios from 'axios'



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

function WeightMeasurement(props) {
    const { classes } = props;
    const [newMeasurement, setNewMeasurement] = useState(0);
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [currentMeasurements, setCurrentMeasurements] = useState([]);
    const athleteId = props.id

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              'http://localhost:9966/completefitnesstracker/api/weightMeasurements/athlete/' + athleteId,
            );
      
            setCurrentMeasurements(result.data)
          };
      
        fetchData();
    }, [currentMeasurements]);

    const addWeightMeasurement = () => {
        if (newMeasurement > 0){
            const fetchData = async () => {

            const result = await axios.post(
                'http://localhost:9966/completefitnesstracker/api/weightMeasurements/add/' + athleteId,
                { 
                    weight: newMeasurement,
                    date: moment(date).format("YYYY/MM/DD")
                }
            );

            const measurement = {
                weight: newMeasurement,
                date: moment(date).format("YYYY/MM/DD")
            }

            if (result.status == '201'){
                setCurrentMeasurements([{
                    ...currentMeasurements,
                    measurement
                  }]);
            }
        };
        fetchData()
        }

    }
    
    return (
        <div className={classes.WeightMeasurement}>
        <Grid container spacing={24}>
            <Grid item xs>
                <Typography variant="h4" gutterBottom component="h2" align="center">
                    Weight Measurements
                </Typography>
            </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={24} justify="center" alignItems="center" height>
            <Grid item >
            <TextField
                id="standard-name"
                label="New Measurment"
                className={classes.textField}
                value={newMeasurement}
                onChange={e => setNewMeasurement(e.target.value)}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                id="date"
                type="date"
                label="Date"
                value={date}
                className={classes.textField}
                onChange={e => setDate(e.target.value)}
                margin="normal"
            />
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={addWeightMeasurement}>
                    Submit
                </Button>
            </Grid>
        </Grid>
        <br/>
        <WeightMeasurementGraph currentMeasurements={currentMeasurements}/>
       </div>
    );
}

export default withStyles(styles)(WeightMeasurement);