import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import  moment from 'moment'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
  title: {
    flex: '0 0 auto',
  },
});

function Meal(props) {
  const { classes } = props;
  const currentDate = props.currentDate;
  const currentNutritionEntry = props.currentNutritionEntry;

  return (

    <Paper className={classes.root}>
      <Toolbar>
      <Typography variant="h6" id="tableTitle">
      {(moment(currentDate).format("MM/DD/YYYY"))}&nbsp;-&nbsp;{props.name}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Food Name</TableCell>
            <TableCell align="right">Calories</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {currentNutritionEntry.map(meal => {
           if (meal.mealName === props.name) {
             return (
              meal.foods.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.foodName}
                  </TableCell>
                  <TableCell align="right">{row.fat * 9 + row.carbohydrates * 4 + row.protein * 4}</TableCell>
                </TableRow>
                ))
             )
            }
            /*<TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>

            </TableRow>*/
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(Meal);
