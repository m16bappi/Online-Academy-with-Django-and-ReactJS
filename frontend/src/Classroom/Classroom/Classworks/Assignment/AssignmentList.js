import React, {useState} from "react";
import {connect} from "react-redux";
import {Backdrop, Box, Button, Divider, Fade, IconButton, makeStyles, Modal, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Assignment from "./Assignment";
import CreateAssignment from "./CreateAssignment";
import {getAssignmentParticipants} from "../../../../../store/Actions/Classroom/Classroom";
import AssignmentParticipantList from "./AssignmentParticipantList";

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
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    createAssignment: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    assignmentParticipant: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const AssignmentList = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(false)
    const [state, setState] = useState()
    const [create, setCreate] = useState(false)
    const [ap, setAP] = useState(false)
    const onClickHandler = (item) => {
        setState(item)
        setValue(true)
    }

    const createAssignmentHandler = () => {
        setCreate(true)
    }

    const getParticipant = (id) => {
        props.getAssignmentParticipants(id)
        setAP(true)
    }

    return (
        <Box>
            <Box className={classes.header}>
                <Typography variant="h4">Assignments</Typography>
                {props.user.status === 'teacher' ?
                    <IconButton color="primary" onClick={createAssignmentHandler}><AddIcon/></IconButton> : null}
            </Box>
            <Divider/>
            <br/>
            {props.assignments.map((item, index) => (
                <Box className={classes.listItem} key={index} onClick={item.status && props.user.status === 'student'? () => onClickHandler(item) : null}>
                    <Typography variant="h6">{item.title}</Typography>
                    {props.user.status === 'teacher' ?
                        <Button variant="outlined" color="primary" onClick={() => getParticipant(item.id)}>Submitted
                            list</Button> : item.status ?
                            <Typography>{new Date(item["submission_time"]).toLocaleString().split('T')[0]}</Typography>
                            :
                            <Typography>Time over</Typography>
                    }
                </Box>
            ))}
            {value ? <Assignment open={value} onclose={() => setValue(false)} item={state}
                                 username={props.user.username}/> : null}
            {create ? <Modal open={create} onClose={() => setCreate(false)} className={classes.createAssignment}
                             closeAfterTransition
                             BackdropComponent={Backdrop}
                             BackdropProps={{
                                 timeout: 500,
                             }}
            >
                <Fade in={create}>
                    <div style={{outline: "none"}}>
                        <CreateAssignment id={props.classroom.id}/>
                    </div>
                </Fade>
            </Modal> : null}
            {ap? <Modal open={ap} onClose={()=>setAP(false)} className={classes.assignmentParticipant}>
                <div style={{outline: "none"}}>
                    <AssignmentParticipantList list={props.assignmentParticipantList}/>
                </div>
            </Modal>:null }
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        assignments: state.Classroom.assignments,
        user: state.Auth.user,
        assignmentParticipantList: state.Classroom.participantList.assignment
    }
}

export default connect(mapStateToProps, {getAssignmentParticipants})(AssignmentList)
