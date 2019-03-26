import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const styles = theme => ({
  root: {
    width: '100%',
    margin: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function WeightliftingTable(props) {
  const { classes } = props;
  const currentWorkout = props.currentWorkout
  const currentDate = props.currentDate

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" id="tableTitle">
            Workout for {(moment(currentDate).format("MMMM Do, YYYY"))}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Exercise Name</TableCell>
            <TableCell align="right">Sets</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Weight (lbs.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(typeof currentWorkout == 'undefined' || !("exercises" in currentWorkout)) ||

          currentWorkout.exercises.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
              <div>{row.exerciseName}</div>
              </TableCell>
              <TableCell align="right"><div>{row.sets}</div></TableCell>
              <TableCell align="right"><div>{row.reps}</div></TableCell>
              <TableCell align="right"><div>{row.weight}</div></TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(WeightliftingTable);