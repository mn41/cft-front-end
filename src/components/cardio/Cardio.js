import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LoadIcon from '@material-ui/icons/CloudDownload'
import CardioTable from './CardioTable'
import moment from 'moment';
import { URL_STRING } from '../../config.js'
import CardioForm from './CardioForm'
import shortid from 'shortid';

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

class Cardio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            currentWorkout: {},
            currentDate: moment(new Date()).format("YYYY-MM-DD"),
            searchDate: moment(new Date()).format("YYYY-MM-DD"),
            isFormOpen: false,
            formType: "Add Workout",
            formDate: moment(new Date()).format("YYYY-MM-DD"),
            formWorkoutName: '',
            exercises: [{
                shortID: shortid.generate(),
                exerciseName: '',
                sets: '',
                reps:'',
                elapsedTime:'',
            }]
        }
    }

    componentDidMount(){

        fetch(URL_STRING + 'workout/recent/athlete/' + this.props.id + '?category=Cardio')
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: json[0],
            currentDate: moment(json[0].date).format("YYYY-MM-DD")
        }));
        console.log(this.state.currentWorkout)

    }

    getWorkout = () => {
        var queryDate = moment(this.state.searchDate).format("YYYY/MM/DD")
        fetch(URL_STRING + 'workout/dateBetween?startDate=' + queryDate + '&endDate=' + queryDate + '&athleteId=' + this.props.id + '&category=Cardio')
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: (json.length > 0 ? json[0] : []),
            currentDate:  moment(this.state.searchDate).format("YYYY-MM-DD")
        }));
    }

    loadRecentWorkout = () => {
       
        fetch(URL_STRING + 'workout/recent/athlete/' + this.props.id + '?category=Cardio')
        .then(res => res.json())
        .then(json => this.setState({
            currentWorkout: json[0],
            currentDate: moment(json[0].date).format("YYYY-MM-DD")
        }));

    }

    addWorkout = () => {
        if(this.state.formType !== "Add Workout"){
            this.setState({formType: "Add Workout"})
            this.onClearExercises()
        }
        this.handleFormOpen()
    }

    editWorkout = () => {
        this.setState({formType: "Edit Workout"})
        this.setState({formDate: this.state.currentDate})
        this.setState({formWorkoutName: this.state.currentWorkout.workoutName})
        const exercises = this.state.currentWorkout.exercises.map((exercise) => {
            var e = {...exercise, shortID: shortid.generate()}
            return e
        });

        this.setState({
            exercises: exercises
        })
        this.handleFormOpen()
    }

    handleFormOpen = () => {
        this.setState({isFormOpen: true})
    }

    handleFormClose = () => {
        this.setState({isFormOpen: false})
    }

    handleFormDateChange = (formDate) => {
        this.setState({formDate: formDate})
    }

    handleFormWorkoutNameChange = (formDate) => {
        this.setState({formDate: formDate})
    }

    onClearExercises = () => {
        this.setState({ 
            exercises: [{
                shortID: shortid.generate(),
                exerciseName: '',
                sets: '',
                reps:'',
                elapsedTime:'',
            }],
            formWorkoutName: ''
         });
    };

    onAddExercise = () => {
        this.setState(state => {
          const exercises = [...state.exercises,
            {
                shortID: shortid.generate(),
                exerciseName: '',
                sets: '',
                reps:'',
                elapsedTime:'',
            }];
    
          return {
            exercises,
          };
        });
    };

    onUpdateExercise = (shortID, attribute) => {
        console.log(this.state.exercises)
        var index = this.state.exercises.findIndex(exercise => exercise.shortID === shortID);
          this.setState(state => {
            const exercises = [
               ...state.exercises.slice(0,index),
               Object.assign({}, state.exercises[index], attribute),
               ...state.exercises.slice(index+1)
            ];

            return {
                exercises,
              };
          });
    }

    onDeleteExercise = shortID => {
        if(this.state.exercises.length > 1){

        this.setState(state => {
          const exercises = state.exercises.filter(exercise => exercise.shortID !== shortID);
    
          return {
            exercises,
          };
        });
      } else {
          this.onClearExercises()
      }
    };

    onFormSubmit = () => {
        this.setState({isLoading: true})


        if (this.state.formType == "Add Workout"){
           fetch(URL_STRING + 'workout/add/' + this.props.id, {
            method: 'post',
            body: JSON.stringify({
                workoutName: this.state.formWorkoutName,
                category: "Cardio",
                date: moment(this.state.formDate).format("YYYY/MM/DD"),
                exercises: this.state.exercises.map(exercise => ({
                    exerciseName: exercise.exerciseName,
                    sets: parseFloat(exercise.sets),
                    reps: parseFloat(exercise.reps),
                    elapsedTime: parseFloat(exercise.elapsedTime),
                }))
            }),
            headers: {
                "Content-Type": "application/json",
            }
           })
           .then((res) => {
               console.log(res.status)
            if (res.status == '201'){
                this.setState({ 
                    searchDate: this.state.formDate
                })
                this.getWorkout()
                this.onClearExercises()
                this.setState({isFormOpen: false})
            }});

        } else {
            fetch(URL_STRING + 'workout/' + this.state.currentWorkout.id, {
                method: 'put',
                body: JSON.stringify(
                    {
                        workoutName: this.state.formWorkoutName,
                        category: "Cardio",
                        date: moment(this.state.formDate).format("YYYY/MM/DD"),
                        exercises: this.state.exercises.map(exercise => ({
                            exerciseName: exercise.exerciseName,
                            sets: parseFloat(exercise.sets),
                            reps: parseFloat(exercise.reps),
                            elapsedTime: parseFloat(exercise.elapsedTime),
                        }))
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                }
               })
               .then((res) => {
                if (res.status == '204'){
                    this.setState({ 
                        searchDate: this.state.formDate
                    })
                    this.getWorkout()
                    this.setState({isFormOpen: false})
                }});
    
        }
        this.setState({isLoading: false})

    }


    
    render() {
        const { classes } = this.props;
        return (
            <div >
            <Grid container spacing={24}>
                <Grid item xs>
                    <Typography variant="h4" gutterBottom component="h2" align="center">
                        Cardio   
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
            <br/>
            <Grid container spacing={24} justify="space-around" alignItems="center">
            {!("exercises" in this.state.currentWorkout) || this.state.currentWorkout.exercises.length == 0 ?
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.loadRecentWorkout}>  
                    <LoadIcon/>
                    &nbsp; Load Most Recent Workout
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>

            :
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.editWorkout}>  
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
                            value={this.state.searchDate}
                            className={classes.textField}
                            onChange={e => this.setState({searchDate: e.target.value})}
                            margin="normal"
                        />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={this.getWorkout}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.addWorkout}>  
                        <AddIcon className={classes.addIcon} />
                        &nbsp; New Workout
                    </Button>
                    <div className={classes.tableContainer}>
                    </div>
                </Grid>
                <CardioTable currentDate={this.state.currentDate} currentWorkout={this.state.currentWorkout}/>
            </Grid>
            <CardioForm isLoading={this.state.isLoading} isFormOpen={this.state.isFormOpen} onFormClose={this.handleFormClose} formDate={this.state.formDate} onFormDateChange={this.handleFormDateChange} formWorkoutName={this.state.formWorkoutName} onFormWorkoutNameChange={this.handleFormWorkoutNameChange} onAddExercise={this.onAddExercise} onDeleteExercise={this.onDeleteExercise} onUpdateExercise={this.onUpdateExercise} exercises={this.state.exercises} title={this.state.formType} onFormSubmit={this.onFormSubmit}/>
        </div>
        );
    }
}

export default withStyles(styles)(Cardio);