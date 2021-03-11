import React, {useState} from "react";
import {
    Box, Button, ButtonGroup,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {createExam} from "../../../../../store/Actions/Classroom/Classroom";

const useStyles = makeStyles({
    root: {
        width: "30rem",
        height: "42rem",
        background: "white",
        borderRadius: "5px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    },
    title: {
        marginBottom: "5px",
        textAlign: "center"
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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

    const radioHandler = (event) => {
        setQsn({...qsn, answer: event.target.value})
    }

    const qsnAddHandler = () => {
        setQsnSet([...qsnSet, qsn])
        setQsn({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: 'A',
            marks: 0
        })
    }

    const qsnOnChangeHandler = (event) => {
        setQsn({
            ...qsn,
            [event.target.name]: event.target.value
        })
    }

    const submit = () => {
        props.createExam(exam, qsnSet, date)
    }

    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant="h6">Quiz Create</Typography>
            <TextField fullWidth label="Enter exam name"
                       onChange={event => setExam({...exam, exam_name: event.target.value})}
            />
            <TextField fullWidth label="Enter total marks"
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
            <TextField label="Question" name="question" fullWidth value={qsn.question}
                       onChange={qsnOnChangeHandler}
            />
            <TextField label="option 1" name="option1" fullWidth value={qsn.option1}
                       onChange={qsnOnChangeHandler}
            />
            <TextField label="option 2" name="option2" fullWidth value={qsn.option2}
                       onChange={qsnOnChangeHandler}
            />
            <TextField label="option 3" name="option3" fullWidth value={qsn.option3}
                       onChange={qsnOnChangeHandler}
            />
            <TextField label="option 4" name="option4" fullWidth value={qsn.option4}
                       onChange={qsnOnChangeHandler}
            />
            <TextField label="marks" name="marks" fullWidth value={qsn.marks}
                       onChange={qsnOnChangeHandler}
            />
            <FormControl>
                <RadioGroup value={qsn.answer} onChange={event => radioHandler(event)} row>
                    <FormControlLabel value="A" control={<Radio/>}
                                      label='A' labelPlacement="end"/>
                    <FormControlLabel value="B" control={<Radio/>}
                                      label='B' labelPlacement="end"/>
                    <FormControlLabel value="C" control={<Radio/>}
                                      label='C' labelPlacement="end"/>
                    <FormControlLabel value="D" control={<Radio/>}
                                      label='D' labelPlacement="end"/>
                </RadioGroup>
            </FormControl>
            <Box className={classes.footer}>
                <ButtonGroup>
                    <Button color="primary" variant="contained" onClick={qsnAddHandler}>Add</Button>
                    <Button color="secondary" variant="contained" onClick={submit}>Submit</Button>
                </ButtonGroup>
                <Typography>{`added questions: ${qsnSet.length}`}</Typography>
            </Box>
        </Box>
    )
}

export default connect(null, {createExam})(CreateExam)
