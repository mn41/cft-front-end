import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    field: {
        marginRight: theme.spacing.unit * 3 
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
    
    return (
        <Grid container spacing={0} justify="center" alignItems="center">
            <Grid item >
            <TextField
                label="Exercise Name"
                className={classes.field}
                value={props.exerciseName}
                onChange={e => props.onUpdateExercise(props.exercise.id, {exerciseName: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Sets"
                className={classes.field}
                value={props.sets}
                onChange={e => props.onUpdateExercise(props.exercise.id, {sets: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Reps"
                className={classes.field}
                value={props.reps}
                onChange={e => props.onUpdateExercise(props.exercise.id, {reps: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Weight"
                className={classes.field}
                value={props.weight}
                onChange={e => props.onUpdateExercise(props.exercise.id, {weight: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item>
            <IconButton aria-label="Add" onClick={() => props.onAddExercise()}>
                <AddIcon />
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton aria-label="Delete" className={classes.field} onClick={() => props.onDeleteExercise(props.exercise.id)}>
                <DeleteIcon />
            </IconButton>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(ExerciseRow);