import React from "react";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ExerciseRow from "./ExerciseRow";
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  dialog: {
      marginRight: theme.spacing.unit * 3 
  },
  toolbar: theme.mixins.toolbar,
  content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
  },
});

class WorkoutForm extends React.Component {
    constructor(props) {
        super(props);

      }

  render() {

    const {classes} = this.props

    return (
        <Dialog
          open={this.props.isFormOpen}
          onClose={this.props.onFormClose}
          className={classes.dialog}
          aria-labelledby="form-dialog-title"
          maxWidth='lg'
        >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
      
            <TextField
                id="date"
                type="date"
                label="Workout Date"
                style = {{width: 150}}
                value={this.props.formDate}
                onChange={e => this.props.onFormDateChange(e.target.value)}
                margin="normal"
            />

            {this.props.exercises.map((exercise) =>
              <ExerciseRow key={exercise.id} exercise={exercise} onAddExercise={this.props.onAddExercise} onDeleteExercise={this.props.onDeleteExercise} onUpdateExercise={this.props.onUpdateExercise}/>
            )}



      </DialogContent>
      <DialogActions>
            <Button onClick={this.props.onFormClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onFormClose} color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(WorkoutForm);
