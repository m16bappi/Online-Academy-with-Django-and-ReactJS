import React, {useState} from "react";
import {connect} from "react-redux";
import {Box, Container, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";

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
    const [Collapse, setCollapse] = useState({})
    const [intake, setIntake] = useState({id: 0})

    const collapseHandler = (id) => {
        setCollapse({[id]: !collase[id]})
        setIntake({id: id})
    }

    return(
        <Container>
            <Box className={classes.header}>
                <Typography variant="h3" color="inherit">{params.name}</Typography>
            </Box>
            <List>
                {props.intake.filter(value => value.program_name === params.name).map((item, index) => (
                    <ListItem key={index} button>{item.intake_name}</ListItem>
                ))}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        intake: state.Program.intake,
        classroomList: state.Classroom.classroomList
    }
}

export default connect(mapStateToProps)(ClassroomList)
