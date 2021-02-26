import React, {useState} from "react";
import {connect} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";

const semester = [
    {name: 'Spring'},
    {name: 'Summer'},
    {name: 'Fall'},
]

const course = [
    {name: "CSE-101"},
    {name: "CSE-111"},
    {name: "CSE-121"},
    {name: "CSE-417"},
]

const useStyles = makeStyles(()=>({
  root: {
      width: "25rem",
      height: "35rem",
      background: "white",
      paddingTop: "2rem",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      borderRadius: "5px",
      display: "flex",
      gap: "1rem",
      flexDirection:"column",
  }
}))

const CreateClassroom = (props) => {
    const classes = useStyles()
    const date = new Date().getFullYear()

    const [state, setState] = useState({
        program: '',
        intake: '',
        section: '',
        semester: '',
        course: ''
    })

    return (
        <Box className={classes.root}>
            <Typography variant="h6">Create Classroom</Typography>
            <Autocomplete
                onChange={(event,value) =>
                    setState({...state, program: value ? value.program_title: ''})}
                options={props.program ? props.program: null}
                getOptionLabel={(option) => option.program_title}
                renderInput={(params) => <TextField {...params} label="Program" variant="outlined" />}
            />
            <Autocomplete
                options={props.intake ? props.intake.filter(value => value.program_name === state.program):null}
                getOptionLabel={(option) => option.intake_name}
                onChange={(event, value) =>
                    setState({...state, intake: value ? value.intake_name : ''})
                }
                renderInput={(params) => <TextField {...params} label="Intake" variant="outlined" />}
            />

            <TextField variant="outlined" label="Section" value={state.section}
                onChange={event => setState({...state, section: event.target.value})}
            />

            <Autocomplete
                options={semester}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) =>
                    setState({...state, semester: value ? value.name + ' ' + date : ''})
                }
                renderInput={(params) => <TextField {...params} label="Semester" variant="outlined" />}
            />

            <Autocomplete
                options={course}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) =>
                    setState({...state, course: value ? value.name : ''})
                }
                renderInput={(params) => <TextField {...params} label="Course" variant="outlined" />}
            />
            <Button variant="contained" color="primary" fullWidth>Create</Button>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        program: state.Program.program,
        intake: state.Program.intake
    }
}

export default connect(mapStateToProps)(CreateClassroom)
