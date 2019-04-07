import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    field: {
        marginRight: theme.spacing.unit * 3,
        width: 150
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
  });

function ExerciseRow(props){
    
    const { classes } = props
    console.log(props.exercise)

    return (
        <div style={{width: 800}}>
           <Grid container spacing={0} justify="flex-start" alignItems="flex-end">
            <Grid item >
            <TextField
                label="Exercise Name"
                className={classes.field}
                value={props.exercise.exerciseName}
                onChange={e => props.onUpdateExercise(props.exercise.shortID, {exerciseName: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Sets"
                className={classes.field}
                value={props.exercise.sets}
                onChange={e => props.onUpdateExercise(props.exercise.shortID, {sets: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Reps"
                className={classes.field}
                value={props.exercise.reps}
                onChange={e => props.onUpdateExercise(props.exercise.shortID, {reps: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Time (minutes)"
                className={classes.field}
                value={props.exercise.elapsedTime}
                onChange={e => props.onUpdateExercise(props.exercise.shortID, {weight: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item>
            <IconButton aria-label="Add" onClick={() => props.onAddExercise()}>
                <AddIcon />
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton aria-label="Delete" onClick={() => props.onDeleteExercise(props.exercise.shortID)}>
                <DeleteIcon />
            </IconButton>
            </Grid>
</Grid>
            </div>
    )
}

export default withStyles(styles)(ExerciseRow);