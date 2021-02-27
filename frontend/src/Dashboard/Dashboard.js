import React, {useEffect, useState} from "react";
import {Box, Container, Fab, makeStyles, Modal} from "@material-ui/core";
import {connect} from "react-redux";

import teacherImg from "./img/teacher.jpg"
import AddIcon from '@material-ui/icons/Add';
import CreateClassroom from "../CreateClassroom/CreateClassroom";
import {get_teacher_classroom} from "../../store/Actions/Classroom/Classroom";
import MyClassroomListItem from "../Classroom/MyClassroomList/MyClassroomListItem/MyClassroomListItem";

const useStyle = makeStyles(()=>({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    fab: {
        right: 100,
        bottom: 100,
        position: 'fixed'
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))

const Dashboard = (props) => {
    const classes = useStyle()
    const [modal, setModal] = useState(false)
    useEffect(()=>{
        props.get_teacher_classroom()
    }, [])

    return (
        <Container className={classes.root} maxWidth={"xl"}>
            <Modal open={modal} onClose={() => setModal(false)} className={classes.modal}>
                <Box style={{outline: "none"}}><CreateClassroom onClose={()=>setModal(false)}/></Box>
            </Modal>
            {props.teacher_classroom.map((value, index) => (
                <MyClassroomListItem class_name={value.class_name} image={teacherImg} id={value.id} key={index}/>
            ))}
            <Fab className={classes.fab} color={"secondary"} onClick={()=>setModal(true)}>
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
