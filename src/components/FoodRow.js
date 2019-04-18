import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'

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

function FoodRow(props){
    
    const { classes } = props

    return (
        <div style={{width: 1000}}>
           <Grid container spacing={0} justify="flex-start" alignItems="flex-end">
            <Grid item >
            <TextField
                label="Food Name"
                className={classes.field}
                value={props.food.foodName}
                onChange={e => props.onUpdateFood(props.food.shortID, {foodName: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                id="standard-select-currency"
                select
                label="Meal Name"
                className={classes.field}
                value={props.food.mealName}
                onChange={e => props.onUpdateFood(props.food.shortID, {mealName: e.target.value})}

                margin="normal"
                >
                <MenuItem key="Breakfast" value="Breakfast">
                    Breakfast
                </MenuItem>
                <MenuItem key="Lunch" value="Lunch">
                    Lunch
                </MenuItem>
                <MenuItem key="Dinner" value="Dinner">
                    Dinner
                </MenuItem>
                <MenuItem key="Other" value="Other">
                    Other
                </MenuItem>
                </TextField>
            </Grid>
            <Grid item >
            <TextField
                label="Fat (g)"
                className={classes.field}
                value={props.food.fat}
                onChange={e => props.onUpdateFood(props.food.shortID, {fat: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Carbohydrates (g)"
                className={classes.field}
                value={props.food.carbohydrates}
                onChange={e => props.onUpdateFood(props.food.shortID, {carbohydrates: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item >
            <TextField
                label="Protein (g)"
                className={classes.field}
                value={props.food.protein}
                onChange={e => props.onUpdateFood(props.food.shortID, {protein: e.target.value})}
                margin="normal"
            />
            </Grid>
            <Grid item>
            <IconButton aria-label="Add" onClick={() => props.onAddFood()}>
                <AddIcon />
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton aria-label="Delete" onClick={() => props.onDeleteFood(props.food.shortID)}>
                <DeleteIcon />
            </IconButton>
            </Grid>
</Grid>
            </div>
    )
}

export default withStyles(styles)(FoodRow);