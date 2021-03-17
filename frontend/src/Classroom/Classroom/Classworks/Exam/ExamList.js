import React, {useState} from "react";
import {connect} from "react-redux";
import {
    Box,
    Button,
    Collapse,
    Divider,
    IconButton,
    makeStyles,
    Modal,
    Typography,
    Backdrop,
    Fade
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Exam from "./Exam";
import CreateExam from "./CreateExam";
import {exportToCSV} from "../FileSave/FileSave";
import GetAppIcon from '@material-ui/icons/GetApp';

import {getExamParticipantList} from "../../../../../store/Actions/Classroom/Classroom";

const useStyles = makeStyles(theme => ({
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
        paddingRight: theme.spacing(2),
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
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    examParticipantList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const ExamList = (props) => {
    const classes = useStyles()
    const [collapse, setCollapse] = useState({})
    const [ep, setEp] = useState(false)
    const [modal, setModal] = useState(false)
    const [exam, setExam] = useState(false)
    const [examName, setExamName] = useState({
        exam_id: '',
        exam_name: ''
    })

    const collapseHandler = (index, id, exam_name) => {
        setCollapse({[index]: !collapse[index]})
        setExamName({
            exam_id: id,
            exam_name: exam_name
        })
    }

    const examModalHandler = () => {
        setExam(false)
    }

    const startExamHandler = () => {
        setExam(true)
    }

    const examParticipantList = (id) => {
        props.getExamParticipantList(id)
        setEp(true)
    }

    if (props.examParticipantList.length && ep) {
        exportToCSV(props.examParticipantList, 'quiz')
        setEp(false)
    }

    return (
        <Box>
            <Box className={classes.header}>
                <Typography variant="h4">Quiz</Typography>
                {props.user.status === 'teacher' ? <IconButton color="primary" onClick={() => setModal(true)}>
                    <AddIcon/></IconButton> : null}
            </Box>
            <Divider/>
            <br/>
            {props.examlist.map((item, index) => (
                <Box key={index}
                     className={collapse[index] ? `${classes.listItemRoot} ${classes.active}` : classes.listItemRoot}>
                    <Box className={classes.listItem}
                         onClick={item.status && props.user.status === 'student' ? () => collapseHandler(index, item.id, item.exam_name) : null}>
                        <Typography variant="h6">{item.exam_name}</Typography>
                        {props.user.status === 'teacher' ?
                            <Button variant="outlined" color={"primary"}
                                    onClick={() => examParticipantList(item.id, item.exam_name)}><GetAppIcon /></Button> : item.status ?
                                <Typography>{new Date(item.submission_time).toLocaleString().split('T')[0]}</Typography>
                                :
                                <Typography>Exam finished</Typography>
                        }
                    </Box>
                    <Collapse in={collapse[index]}>
                        <Box className={classes.listItemCollapse}>
                            <Divider/>
                            <Box component="p">posted
                                time: {new Date(item["posted_time"]).toLocaleDateString().split('T')[0]}</Box>
                            <Box component="p">
                                1. Read carefully and answer the questions.<br/>
                                2. You have to complete on time.<br/>
                                3. Every next question come after a countdown.<br/>
                                4. Mark the correct answer and hit next for next questions.
                            </Box>
                            <Divider/>
                            <Box component="div">
                                {item["submitted"].includes(props.user.username) ?
                                    <Typography variant="h6">Submitted</Typography>
                                    :
                                    <Button variant="outlined" color="secondary"
                                            onClick={() => startExamHandler()}
                                    >Start</Button>
                                }
                            </Box>
                        </Box>
                        {collapse[index] && exam ?
                            <Exam open={exam} onClose={() => examModalHandler()} exam_name={examName}/> : null}
                    </Collapse>
                </Box>
            ))}
            {modal ? <Modal open={modal} onClose={() => setModal(false)} className={classes.modal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
            >
                <Fade in={modal}>
                    <div style={{outline: "none"}}>
                        <CreateExam id={props.classroom.id} onClose={() => setModal(false)}/>
                    </div>
                </Fade>
            </Modal> : null}
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        examlist: state.Classroom.examlist,
        user: state.Auth.user,
        examParticipantList: state.Classroom.participantList.exam
    }
}

export default connect(mapStateToProps, {getExamParticipantList})(ExamList)
