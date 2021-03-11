import React, {useEffect, useState} from "react";
import {
    Box,
    Modal,
    Backdrop,
    makeStyles,
    Fade,
    Typography,
    Button,
    FormControl,
    RadioGroup, FormControlLabel, Radio
} from "@material-ui/core";
import {connect} from "react-redux";
import {getQuestions, postAssignmentParticipants} from "../../../../../store/Actions/Classroom/Classroom";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "35rem",
        minHeight: "35rem",
        background: "white",
        margin: theme.spacing(5)
    },
    containerHeader: {
        background: "#E8F0FE",
        height: "5rem",
        borderBottom: "2px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '& h4': {
            fontFamily: "Playfair Display, serif",
            fontWeight: 600
        }
    },
    containerBody: {
        height: "25rem",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const Exam = (props) => {
    const classes = useStyles()
    const params = useParams().className
    const [value, setValue] = useState('')
    const [index, setIndex] = useState(0)
    const [marks, setMarks] = useState(0)

    useEffect(() => {
        props.getQuestions(params, props.exam_name.exam_name)
    }, [])

    const onNextQuestion = (mark, answer) => {
        setIndex(index + 1)
        if (answer === value) {
            setMarks(marks + mark)
        }
    }

    const onSubmitHandler = () => {
        props.postParticipants(props.exam_name.exam_id, marks)
        props.onClose()
    }

    const radioHandler = (e) => {
        setValue(e.target.value)
    }

    return (
        <Modal open={props.open}
               className={classes.root}
               closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}
        >
            <Fade in={props.open}>
                <Box className={classes.container}>
                    <Box className={classes.containerHeader}>
                        <Typography variant="h4">{props.exam_name.exam_name}</Typography>
                    </Box>
                    {props.questions.length > index ?
                        <Box className={classes.containerBody}>
                            <Typography variant="h6">This is question title</Typography>
                            <FormControl>
                                <RadioGroup value={value} onChange={event => radioHandler(event)}>
                                    <FormControlLabel value="A" control={<Radio/>}
                                                      label={props.questions[index].option1}/>
                                    <FormControlLabel value="B" control={<Radio/>}
                                                      label={props.questions[index].option2}/>
                                    <FormControlLabel value="C" control={<Radio/>}
                                                      label={props.questions[index].option3}/>
                                    <FormControlLabel value="D" control={<Radio/>}
                                                      label={props.questions[index].option4}/>
                                </RadioGroup>
                            </FormControl>
                            <Button
                                onClick={() => onNextQuestion(props.questions[index].marks, props.questions[index].answer)}
                                variant="outlined" color="primary">next</Button>
                        </Box> :
                        <Box className={classes.containerBody}>
                            <Typography variant="h4">Exam completed</Typography>
                            <Button variant="contained" color="secondary"
                                    onClick={() => onSubmitHandler()}>Submit</Button>
                        </Box>
                    }
                </Box>
            </Fade>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        questions: state.Classroom.questions
    }
}

export default connect(mapStateToProps, {getQuestions, postParticipants: postAssignmentParticipants})(Exam)
