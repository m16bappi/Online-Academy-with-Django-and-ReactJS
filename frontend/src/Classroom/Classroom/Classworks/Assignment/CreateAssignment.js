import React, {useState} from "react";
import {connect} from "react-redux";
import {Box, Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {post_assignment} from "../../../../../store/Actions/Classroom/Classroom";

const useStyles = makeStyles({
    root: {
        width: "25rem",
        height: "35rem",
        background: "white",
        borderRadius: "5px",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        '&>:nth-child(2)': {
            marginTop: "1rem"
        }
    }
})

const CreateAssignment = (props) => {
    const classes = useStyles()
    const [state, setState] = useState({
        title: '', body: '',
        submission_time: new Date('2021-03-01T21:11:54')
    })
    const submitHandler = () => {
        props.post_assignment(state, props.id)
    }
    return (
        <Box className={classes.root}>
            <Typography variant="h5">Create Assignment</Typography>
            <TextField variant="outlined" label="Assignment title" fullWidth
                       onChange={event => setState({...state, title: event.target.value})}/>
            <TextField multiline rowsMax={10} rows={6} variant="outlined" label="Enter your assignments details"
                       fullWidth onChange={event => setState({...state, body: event.target.value})}/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={2} justify={"center"}>
                    <Grid item xs={6}>
                        <KeyboardDatePicker
                            margin="normal"
                            disableToolbar
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={state.submission_time}
                            onChange={event => setState({...state, submission_time: event})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={state.submission_time}
                            onChange={event => setState({...state, submission_time: event})}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            <Button fullWidth variant="contained" color="primary"
                    onClick={submitHandler}>Post</Button>
        </Box>
    )
}

export default connect(null, {post_assignment})(CreateAssignment)
