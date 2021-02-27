import React, {useState} from "react";
import {connect} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";

import {create_classroom} from "../../store/Actions/Classroom/Classroom";

const semester = [
    {name: 'Spring'},
    {name: 'Summer'},
    {name: 'Fall'},
]

const useStyles = makeStyles(() => ({
    root: {
        width: "25rem",
        height: "40rem",
        background: "white",
        paddingTop: "2rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        borderRadius: "5px",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
    }
}))

const CreateClassroom = (props) => {
    const classes = useStyles()
    const date = new Date().getFullYear()

    const [state, setState] = useState({
        course: '',
        intake: '',
        section: '',
        semester: '',
        program: ''

    })
    const [error, setError] = useState({
        program: false,
        intake: false,
        section: false,
        semester: false,
        course: false
    })

    const onsubmitHandler = () => {
        let flag = 1
        if (!state.program.length) {
            flag = 0
            setError(prevState => {
                return {...prevState, program: true}
            })
        }
        if (!state.intake.length) {
            flag = 0
            setError(prevState => {
                return {...prevState, intake: true}
            })
        }
        if (!state.semester.length) {
            flag = 0
            setError(prevState => {
                return {...prevState, semester: true}
            })
        }
        if (!state.section.length) {
            flag = 0
            setError(prevState => {
                return {...prevState, section: true}
            })
        }
        if (!state.course.length) {
            flag = 0
            setError(prevState => {
                return {...prevState, course: true}
            })
        }
        if (flag === 1) {
            props.create_classroom(state)
            props.onClose()
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6">Create Classroom</Typography>
            <Autocomplete
                onChange={(event, value) => {
                    setState({...state, program: value ? value.program_title : ''})
                    setError({...error, program: false})
                }}
                options={props.program ? props.program : null}
                getOptionLabel={(option) => option.program_title}
                renderInput={(params) => <TextField {...params} name="program"
                                                    error={error.program}
                                                    helperText={error.program ? 'Program required' : ' '}
                                                    label="Program" variant="outlined"/>}
            />
            <Autocomplete
                options={props.intake ? props.intake.filter(value => value.program_name === state.program) : null}
                getOptionLabel={(option) => option.intake_name}
                onChange={(event, value) => {
                    setState({...state, intake: value ? value.intake_name : ''})
                    setError({...error, intake: false})
                }
                }
                renderInput={(params) => <TextField {...params} name="intake"
                                                    error={error.intake}
                                                    helperText={error.intake ? 'intake required' : ' '} label="Intake"
                                                    variant="outlined"/>}
            />

            <TextField variant="outlined" label="Section" value={state.section} name="section"
                       error={error.section} helperText={error.section ? 'section required' : ' '}
                       onChange={event => {
                           setState({...state, section: event.target.value})
                           setError({...error, section: false})
                       }}
            />

            <Autocomplete
                options={semester}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                    setState({...state, semester: value ? value.name + '-' + date : ''})
                    setError({...error, semester: false})
                }
                }
                renderInput={(params) => <TextField {...params} name="semester"
                                                    error={error.semester}
                                                    helperText={error.program ? 'semester required' : ' '}
                                                    label="Semester" variant="outlined"/>}
            />

            <Autocomplete
                options={props.course? props.course.filter(value => value.dept === state.program):null}
                getOptionLabel={(option) => option.course_code}
                onChange={(event, value) => {
                    setState({...state, course: value ? value.course_code : ''})
                    setError({...error, course: false})
                }
                }
                renderInput={(params) => <TextField {...params}
                                                    error={error.course}
                                                    helperText={error.program ? 'course required' : ' '} label="Course"
                                                    variant="outlined"/>}
            />
            <Button variant="contained" color="primary" fullWidth onClick={onsubmitHandler}>Create</Button>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        program: state.Program.program,
        intake: state.Program.intake,
        course: state.Course.course
    }
}

export default connect(mapStateToProps, {create_classroom})(CreateClassroom)
