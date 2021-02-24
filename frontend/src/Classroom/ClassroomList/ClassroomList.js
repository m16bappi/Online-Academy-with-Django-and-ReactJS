import React, {useState} from "react";
import {connect} from "react-redux";
import {
    Box,
    Collapse,
    Container, Icon, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import {useParams} from "react-router-dom";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(()=>({
    header: {
        width: "100%",
        height: "20rem",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const ClassroomList = (props) => {
    const classes = useStyles()
    const params = useParams()
    const [open, setOpen] = useState({})

    const collapseHandler = (index) => {
        setOpen({[index]: !open[index]})
    }

    return(
        <Container>
            <Box className={classes.header}>
                <Typography variant="h3" color="inherit">{params.name}</Typography>
            </Box>
            <List>
                {props.intake.filter(value => value.program_name === params.name).map((item, index) => (
                    <Box key={index}>
                        <ListItem button onClick={()=> collapseHandler(index)} divider>
                            <ListItemText primary={`${item.intake_name} INTAKE`}/>
                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <List>
                                {props.classroomList.filter(value => value.intake === item.intake_name).map((value, index1) => (
                                    <ListItem key={index1}>
                                        <ListItemText primary={value.class_name}/>
                                        <ListItemSecondaryAction>
                                            {props.isAuthenticated && props.status === 'student' ? value.students.includes(props.username)?
                                                <Icon><DoneAllIcon /></Icon> : <IconButton><AddCircleOutlineIcon/></IconButton>: null
                                            }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
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

export default connect(mapStateToProps)(ClassroomList)
