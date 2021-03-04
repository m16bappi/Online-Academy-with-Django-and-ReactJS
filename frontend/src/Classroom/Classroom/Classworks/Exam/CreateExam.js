import React, {useState} from "react";
import {Box, Grid, makeStyles, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles({
    root: {
        width: "30rem",
        height: "40rem",
        background: "white",
        borderRadius: "5px",
        padding: "1rem"
    }
})

const CreateExam = (props) => {
    const classes = useStyles()
    const [date, setDate] = useState(new Date('2021-03-01T21:11:54'))
    const [qsnSet, setQsnSet] = useState([])
    const [exam, setExam] = useState({
        exam_name: '',
        classroom: props.id,
        total_marks: 0,
        submission_time: null
    })
    const [qsn, setQsn] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 'A',
        marks: 0
    })

    return (
        <Box className={classes.root}>
            <TextField multiline rows={2} rowsMax={3} fullWidth name="exam_name" label="Enter exam name"
                       onChange={event => setExam({...exam, exam_name: event.target.value})}
            />
            <TextField fullWidth name="total_marks" label="Enter total marks"
                       onChange={event => setExam({...exam, total_marks: parseInt(event.target.value)})}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={2} justify={"center"}>
                    <Grid item xs={6}>
                        <KeyboardDatePicker
                            margin="normal"
                            disableToolbar
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={date}
                            onChange={event => setDate(event)}
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
                            value={date}
                            onChange={event => setDate(event)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </Box>
    )
}

export default CreateExam
