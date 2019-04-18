import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FoodRow from "./FoodRow";
import { withStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";


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
  buttonProgress: {
    color: green,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class NutritionForm extends React.Component {

  render() {

    const {classes} = this.props

    return (
        <Dialog
          open={this.props.isFormOpen}
          onClose={this.props.onFormClose}
          className={classes.dialog}
          aria-labelledby="form-dialog-title"
          maxWidth='lg'
          scroll='paper'
        >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
        <Grid container spacing={24} justify="flex-start" alignItems="flex-end">
        <Grid item >

            <TextField
                id="date"
                type="date"
                label="Entry Date"
                value={this.props.formDate}
                onChange={e => this.props.onFormDateChange(e.target.value)}
                margin="normal"
            />
             </Grid>
             <Grid item >

             </Grid>
        </Grid>
            {this.props.foods.map((food) =>
              <FoodRow key={food.shortID} food={food} onAddFood={this.props.onAddFood} onDeleteFood={this.props.onDeleteFood} onUpdateFood={this.props.onUpdateFood}/>
            )}



      </DialogContent>
      <DialogActions>
            <Button onClick={this.props.onFormClose} color="primary">
              Cancel
            </Button>
            <div>
              <Button onClick={this.props.onFormSubmit} color="primary">
                Submit
              </Button>
              {this.props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NutritionForm);
