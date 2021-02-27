import React, {useState} from "react";
import {connect} from "react-redux";
import {
    Box, Button,
    Collapse,
    Container, Dialog, DialogActions, DialogTitle, Icon, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles, TextField,
    Typography
} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {join_classroom} from "../../../store/Actions/Classroom/Classroom";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(() => ({
    header: {
        width: "100%",
        height: "20rem",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dialog: {
        width: "25rem",
        height: "auto",
        padding: "1rem"
    }
}))

const ClassroomList = (props) => {
    const classes = useStyles()
    const params = useParams()
    const [open, setOpen] = useState({})
    const [dialog, setDialog] = useState(false)
    const [classObject, setClassObject] = useState()
    const [code, setCode] = useState('')

    const collapseHandler = (index) => {
        setOpen({[index]: !open[index]})
    }

    const classroomJoinHandler = () => {
        props.join_classroom(classObject.id, code)
        setDialog(false)
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Typography variant="h3" color="inherit">{params.name}</Typography>
            </Box>
            <List>
                {props.intake.filter(value => value.program_name === params.name).map((item, index) => (
                    <Box key={index}>
                        <ListItem button onClick={() => collapseHandler(index)} divider>
                            <ListItemText primary={`${item.intake_name} INTAKE`}/>
                            {open[index] ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <List>
                                {props.classroomList.filter(value => value.intake === item.intake_name).map((value, index1) => (
                                    <ListItem key={index1}>
                                        <ListItemText primary={value.class_name}/>
                                        <ListItemSecondaryAction>
                                            {props.isAuthenticated && props.status === 'student' ? value.students.includes(props.username) ?
                                                <Icon><DoneAllIcon/></Icon> :
                                                <IconButton onClick={() => {
                                                    setDialog(true)
                                                    setClassObject(value)
                                                }}>
                                                    <AddCircleOutlineIcon/></IconButton> : null
                                            }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
            {dialog ? <Dialog open={dialog} onClose={() => setDialog(false)} classes={{paper: classes.dialog}}>
                <DialogTitle id="form-dialog-title">Join Classroom</DialogTitle>
                <TextField variant="outlined" onChange={event => setCode(event.target.value)}
                           label="enter your class code"/>
                <DialogActions>
                    <Button onClick={() => classroomJoinHandler()}>Join</Button>
                </DialogActions>
            </Dialog> : null}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        status: state.Auth.user.status,
        isAuthenticated: state.Auth.isAuthenticated,
        username: state.Auth.user.username,
        intake: state.Program.intake,
        classroomList: state.Classroom.classroomList
    }
}

export default connect(mapStateToProps, {join_classroom})(ClassroomList)
