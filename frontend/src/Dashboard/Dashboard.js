import React, {useEffect} from "react";
import {Container, Fab, makeStyles} from "@material-ui/core";
import {connect} from "react-redux";

import teacherImg from "./img/teacher.jpg"
import AddIcon from '@material-ui/icons/Add';
import {get_teacher_classroom} from "../../store/Actions/Classroom/Classroom";
import MyClassroomListItem from "../Classroom/MyClassroomList/MyClassroomListItem/MyClassroomListItem";

const useStyle = makeStyles(theme=>({
    root: {
        display: "flex",
        flexDirection: "row"
    },
    fab: {
        right: 100,
        bottom: 100,
        position: 'fixed'
    }
}))

const Dashboard = (props) => {
    const classes = useStyle()
    useEffect(()=>{
        props.get_teacher_classroom()
    }, [])
    return (
        <Container className={classes.root}>
            {props.teacher_classroom.map((value, index) => (
                <MyClassroomListItem class_name={value.class_name} image={teacherImg} id={value.id} key={index}/>
            ))}
            <Fab className={classes.fab} color={"secondary"}>
                <AddIcon />
            </Fab>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        teacher_classroom: state.Classroom.teacher_classroom
    }
}

export default connect(mapStateToProps, {get_teacher_classroom})(Dashboard)
