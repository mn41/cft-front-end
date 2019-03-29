import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Meal from './Meal.js'
import moment from 'moment';
import { URL_STRING } from '../config.js'
import NutritionForm from './NutritionForm'
import shortid from 'shortid';
import TextField from '@material-ui/core/TextField'

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

class NutritionEntry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            currentNutritionEntry: [],
            currentDate: moment(new Date()).format("YYYY-MM-DD"),
            searchDate: moment(new Date()).format("YYYY-MM-DD"),
            isFormOpen: false,
            formType: "Add Nutrition Entry",
            formDate: moment(new Date()).format("YYYY-MM-DD"),
            foods: [{
                id: shortid.generate(),
                foodName: '',
                mealName:'',
                fat: '',
                carbohydrates:'',
                protein:'',
                calories:''
            }]
        }
    }

    componentDidMount(){

        fetch(URL_STRING + 'meal/recent/athlete/' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentNutritionEntry: (json.length > 0 ? 
                json : []),
            currentDate: moment(json[0].date).format("YYYY-MM-DD")
        }));

    }

    getNutritionEntry = () => {
        var queryDate = moment(this.state.searchDate).format("YYYY/MM/DD")
        fetch(URL_STRING + 'meal/dateBetween?startDate=' + queryDate + '&endDate=' + queryDate + '&athleteId=' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentNutritionEntry: (json.length > 0 ? 
               json : []),
            currentDate:  moment(this.state.searchDate).format("YYYY-MM-DD")
        }));
    }

    loadRecentNutritionEntry = () => {
       
        fetch(URL_STRING + 'meal/recent/athlete/' + this.props.id)
        .then(res => res.json())
        .then(json => this.setState({
            currentMeal: json,
            currentDate: moment(json[0].date).format("YYYY-MM-DD")
        }));

    }

    addNutritionEntry = () => {
        if(this.state.formType !== "Add Nutrition Entry"){
            this.setState({formType: "Add Nutrition Entry"})
            this.onClearNutritions()
        }
        this.handleFormOpen()
    }

    editNutritionEntry = () => {
        this.setState({formType: "Edit Nutrition Entry"})
        this.setState({formDate: this.state.currentNutritionEntry[0].date})
        const foods = this.state.currentWorkout.foods.map((food) => {
            var f = {...food, id: shortid.generate()}
            return f
        });

        this.setState({
            foods: foods
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

    onClearFoods = () => {
        this.setState({ 
            foods: [{
                id: shortid.generate(),
                foodName: '',
                mealName:'',
                fat: '',
                carbohydrates:'',
                protein:'',
                calories:''
            }]
         });
    };

    onAddFood = () => {
        this.setState(state => {
          const foods = [...state.foods,
          {
            id: shortid.generate(),
            mealName:'',
            foodName: '',
            fat: '',
            carbohydrates:'',
            protein:'',
            calories:''
          }]
    
          return {
            foods,
          };
        });
    };

    onUpdateFood = (id, attribute) => {
        var index = this.state.foods.findIndex(food => food.id === id);
          this.setState(state => {
            const foods = [
               ...state.foods.slice(0,index),
               Object.assign({}, state.foods[index], attribute),
               ...state.foods.slice(index+1)
            ];

            return {
                foods,
              };
          });
    }

    onDeleteFood = id => {
        if(this.state.foods.length > 1){

        this.setState(state => {
          const foods = state.foods.filter(food => food.id !== id);
    
          return {
            foods,
          };
        });
      } else {
          this.onClearFoods()
      }
    };

    onFormSubmit = () =>{
        console.log(this.state.foods)

        function groupBy(arr, property) {
            return arr.reduce(function(memo, x) {
              if (!memo[x[property]]) { memo[x[property]] = []; }
              memo[x[property]].push(x);
              return memo;
            }, {});
        }

        var mealArray = groupBy(this.state.foods.map(({id, ...noID}) => noID), 'mealName')
        console.log(mealArray)
        
        Object.keys(mealArray).forEach(key => {
            console.log(key)
            fetch(URL_STRING + 'meal/add/' + this.props.id, {
                method: 'post',
                body: JSON.stringify({
                    mealName: key,
                    date: moment(this.state.formDate).format("YYYY/MM/DD"),
                    foods: mealArray[key]
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

                    this.getNutritionEntry()
                    this.onClearFoods()
                    this.setState({isFormOpen: false})

                }});
            })
        
        
          /*
        if (this.state.formType == "Add Nutrition Entry"){
            fetch(URL_STRING + 'meal/add/' + this.props.id, {
             method: 'post',
             body: JSON.stringify({
                 category: "Weightlifting",
                 date: moment(this.state.formDate).format("YYYY/MM/DD"),
                 exercises: this.state.exercises.map(exercise => ({
                     exerciseName: exercise.exerciseName,
                     weight: parseFloat(exercise.weight),
                     reps: parseFloat(exercise.reps),
                     sets: parseFloat(exercise.sets),
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
        }*/
    }

    render() {
        const { classes } = this.props;
    return (
        <div className={classes.weightlifting}>
        <Grid container spacing={24}>
            <Grid item xs>
                <Typography variant="h4" gutterBottom component="h2" align="center">
                    Nutrition
                </Typography>
            </Grid>
        </Grid>
        <Divider/>
        <br/>
        <Grid container spacing={24} justify="space-around">
            <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.button} component={NavLink} to="/addNutrition">  
                    <EditIcon className={classes.editIcon} />
                    &nbsp; Edit Nutrition Entry
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
            <Grid item>
                    <Grid container spacing={24} justify="center" alignItems="center">
                        <Grid item>
                        <TextField
                            id="date"
                            type="date"
                            label="Select Entry Date"
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
                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.addNutritionEntry}>  
                    <AddIcon className={classes.addIcon} />
                    &nbsp; New Nutrition Entry
                </Button>
                <div className={classes.tableContainer}>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={24} justify="space-around">
            <Grid item xs>
            <Meal name='Breakfast'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Lunch'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Dinner'></Meal>
            </Grid>
            <Grid item xs>
            <Meal name='Other'></Meal>
            </Grid>
        </Grid>
        <NutritionForm isLoading={this.state.isLoading} isFormOpen={this.state.isFormOpen} onFormClose={this.handleFormClose} formDate={this.state.formDate} onFormDateChange={this.handleFormDateChange} formWorkoutName={this.state.formWorkoutName} onFormWorkoutNameChange={this.handleFormWorkoutNameChange} onAddFood={this.onAddFood} onDeleteFood={this.onDeleteFood} onUpdateFood={this.onUpdateFood} foods={this.state.foods} title={this.state.formType} onFormSubmit={this.onFormSubmit}/>
       </div>
    );
    }
}

export default withStyles(styles)(NutritionEntry);