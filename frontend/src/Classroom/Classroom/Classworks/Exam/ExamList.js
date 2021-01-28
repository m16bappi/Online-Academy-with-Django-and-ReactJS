import React, {useState} from "react";
import {Box, Button, Collapse, Divider, makeStyles, Typography} from "@material-ui/core";
import Exam from "./Exam";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme=>({
    listItemRoot: {
        borderRadius: '5px',
        '&:hover': {
            boxShadow: theme.shadows[3],
            transition: "0.3s"
        }
    },
    listItem: {
        height: "3rem",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        '&:hover': {
            background: "#E8F0FE",
            transition: "0.3s",
            cursor: "pointer"
        }
    },
    listItemCollapse: {
        minHeight: "5rem",
        paddingLeft: theme.spacing(2),
        paddingRight:theme.spacing(2),
        '& p': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600
        },
        '& div': {
            height: "3rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
        }
    },
    active: {
        boxShadow: theme.shadows[2]
    }
}))


const works = ['work1', 'work2', 'work3', 'work4', 'work5', "work6"]

const ExamList = (props) => {
    const classes = useStyles()
    const params = useParams().className
    const [collapse, setCollapse] = useState({})
    const [exam, setExam] = useState(false)
    const [examName, setExamName] = useState()

    const collapseHandler = (index, exam_name) => {
        setCollapse({[index]: !collapse[index]})
        setExamName(exam_name)
    }
    const examModalHandler = () => {
        setExam(false)
    }

    const startExamHandler = () => {
        setExam(true)
    }

    return(
        <Box>
            <Typography variant="h4">Quiz</Typography>
                <Divider />
                <br/>
                {props.examlist.map((item, index)=> (
                    <Box key={index} className={collapse[index]?`${classes.listItemRoot} ${classes.active}`:classes.listItemRoot}>
                        <Box className={classes.listItem} onClick={item.status? ()=>collapseHandler(index, item.exam_name): null} >
                            <Typography variant="h6">{item.exam_name}</Typography>
                            {item.status ?
                                <Typography>{new Date(item.submission_time).toLocaleString().split('T')[0]}</Typography>
                                :
                                <Typography>Exam finished</Typography>
                            }
                        </Box>
                        <Collapse in={collapse[index]}>
                            <Box className={classes.listItemCollapse}>
                                <Divider />
                                <Box component="p">posted time: {new Date(item.posted_time).toLocaleDateString().split('T')[0]}</Box>
                                <Box component="p">
                                    1. Read carefully and answer the questions.<br/>
                                    2. You have to complete on time.<br/>
                                    3. Every next question come after a countdown.<br/>
                                    4. Mark the correct answer and hit next for next questions.
                                </Box>
                                <Divider />
                                <Box component="div">
                                    <Button variant="outlined" color="secondary"
                                    onClick={()=>startExamHandler()}
                                    >Start</Button>
                                </Box>
                            </Box>
                            {exam ? <Exam open={exam} onClose={()=>examModalHandler()} exam_name={examName}/> : null}
                        </Collapse>
                    </Box>
                ))}
        </Box>
    )
}

export default ExamList
