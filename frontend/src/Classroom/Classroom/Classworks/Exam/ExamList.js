import React, {useState} from "react";
import {Box, Button, Collapse, Divider, makeStyles, Typography} from "@material-ui/core";
import Exam from "./Exam";

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
    const [collapse, setCollapse] = useState({})
    const [exam, setExam] = useState(false)

    const collapseHandler = (index) => {
        setCollapse({[index]: !collapse[index]})
    }
    const examModalHandler = () => {
        setExam(false)
    }

    return(
        <Box>
            <Typography variant="h4">Quiz</Typography>
                <Divider />
                <br/>
                {props.examlist.map((item, index)=> (
                    <Box key={index} className={collapse[index]?`${classes.listItemRoot} ${classes.active}`:classes.listItemRoot}>
                        <Box className={classes.listItem} onClick={item.status? ()=>collapseHandler(index): null} >
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
                                    Read carefully and answer the questions.<br/>
                                    Answer Script should be in id.pdf format.<br/>
                                    Don't Overwrite. Discuss your specific understanding in brief(possibly 6/10 lines max).
                                </Box>
                                <Divider />
                                <Box component="div">
                                    <Button variant="outlined" color="secondary"
                                    onClick={()=>setExam(true)}
                                    >Start</Button>
                                </Box>
                            </Box>
                        </Collapse>
                        <Exam open={exam} onClose={()=>examModalHandler()} exam_name={item.exam_name}/>
                    </Box>
                ))}
        </Box>
    )
}

export default ExamList
