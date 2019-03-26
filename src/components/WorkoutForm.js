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

const level = [
  {
    value: "Easy",
    label: "Easy"
  },
  {
    value: "Mid",
    label: "Mid"
  },
  {
    value: "Difficult",
    label: "Difficult"
  }
];
const category = [
  {
    value: "Science",
    label: "Science"
  },
  {
    value: "Islam",
    label: "Islam"
  },
  {
    value: "Other",
    label: "Other"
  }
];
class WorkoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            level: "",
            category: "",
            option1: "",
            option2: "",
            option3: "",
            option4: ""
        };
      }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    console.log("state", this.state);
    return (
        <Dialog
          open={this.props.isFormOpen}
          onClose={this.props.handleFormClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
      
            <TextField
                id="date"
                type="date"
                label="Workout Date"
                style = {{width: 150}}
                value={this.props.formDate}
                onChange={e => this.props.setFormDate(e.target.value)}
                margin="normal"
            />
            <div className="row">
              <TextField
                id="question"
                label="Question"
                value={this.state.question}
                onChange={this.handleChange("question")}
                margin="normal"
                fullWidth
              />
              <div className="col">
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Check the correct answer/answers options
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option1"
                          />
                          <TextField
                            id="option1"
                            label="Option#1"
                            value={this.state.option1}
                            onChange={this.handleChange("option1")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option1"
                          />
                          <TextField
                            id="option2"
                            label="Option#2"
                            value={this.state.option2}
                            onChange={this.handleChange("option2")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option3"
                          />
                          <TextField
                            id="option3"
                            label="Option#3"
                            value={this.state.option3}
                            onChange={this.handleChange("option3")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={
                        <div>
                          <Checkbox
                            onChange={this.handleChange("answer")}
                            value="option4"
                          />
                          <TextField
                            id="option4"
                            label="Option#4"
                            value={this.state.option4}
                            onChange={this.handleChange("option4")}
                            margin="normal"
                          />
                        </div>
                      }
                      //   label="Gilad Gray"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </div>

              <div
                className="col-4 mt-5"
                //   style={{ border: "2px solid red" }}
              >
                <h1 className="text-danger text-center mb-2">
                  Mandatory Options
                </h1>
                <div className="">
                  <TextField
                    select
                    value={this.state.category}
                    onChange={this.handleChange("category")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Category
                        </InputAdornment>
                      )
                    }}
                  >
                    {category.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* </div>
                <div className=""> */}
                  <TextField
                    select
                    className="mt-5"
                    value={this.state.level}
                    onChange={this.handleChange("level")}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Level</InputAdornment>
                      )
                    }}
                  >
                    {level.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
      </DialogContent>
      <DialogActions>
            <Button onClick={this.props.handleFormClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleFormClose} color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default WorkoutForm;
