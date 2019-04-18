import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import WeightMeasurementGraph from './WeightMeasurementGraph';
import moment from 'moment';
import { URL_STRING } from '../config.js'




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

class WeightMeasurement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMeasurement: 0,
            date: moment(new Date()).format("YYYY-MM-DD"),
            currentMeasurements: [],

        };

      };

    componentDidMount() {

            fetch(URL_STRING + 'weightMeasurements/athlete/' + this.props.id)
            .then(res => res.json())
            .then(json => this.setState({currentMeasurements: json}));
           
      
    }

    addWeightMeasurement = () => {
        if (this.state.newMeasurement > 0){

            const measurement = {
                weight: this.state.newMeasurement,
                date: moment(this.state.date).format("YYYY/MM/DD")
            } 

            fetch(URL_STRING + 'weightMeasurements/add/' + this.props.id, {
                method: 'post',
                body: JSON.stringify({
                    weight: Number(this.state.newMeasurement),
                    date: moment(this.state.date).format("YYYY/MM/DD")
                }),
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => {


                if (res.status === 201){
                    const newMeasurements = this.state.currentMeasurements.concat(measurement)
                    this.setState({ 
                        currentMeasurements: newMeasurements
                })
            }});
        };

    }
    render () {

        const { classes } = this.props;

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
        <Grid container spacing={24} justify="center" alignItems="center">
            <Grid item >
            <TextField
                id="standard-name"
                label="New Measurment"
                className={classes.textField}
                value={this.state.newMeasurement}
                onChange={e => this.setState({newMeasurement: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                id="date"
                type="date"
                label="Date"
                value={this.state.date}
                className={classes.textField}
                onChange={e => this.setState({date: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={this.addWeightMeasurement}>
                    Submit
                </Button>
            </Grid>
        </Grid>
        <br/>
        <WeightMeasurementGraph currentMeasurements={this.state.currentMeasurements}/>
       </div>
    );
    }
}

export default withStyles(styles)(WeightMeasurement);