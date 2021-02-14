import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Container, makeStyles} from "@material-ui/core";
import {GET_MY_CLASSROOMS_LIST} from "../../../store/Actions/Classroom/Classroom";
import MyClassroomListItem from "./MyClassroomListItem/MyClassroomListItem";

import header1 from '../../../../res/my_classroom_header/my_classroom_header (1).jpg';
import header2 from '../../../../res/my_classroom_header/my_classroom_header (2).jpg';
import header3 from '../../../../res/my_classroom_header/my_classroom_header (3).jpg';
import header4 from '../../../../res/my_classroom_header/my_classroom_header (4).jpg';
import header5 from '../../../../res/my_classroom_header/my_classroom_header (5).jpg';

const headerImageList = [header1, header2, header3, header4, header5]

const useStyles = makeStyles(()=> ({
    root: {
        display: "flex",
        flexDirection: "row"
    }
}))

const MyClassroom = (props) => {
    const classes = useStyles()
    useEffect(()=>{
        props.GET_MY_CLASSROOMS_LIST()
    }, [])

    const get_rand = () => {
        return Math.floor(Math.random()*headerImageList.length)
    }

    return(
        <Container className={classes.root}>
            {props.myclassroom.map((item, index)=> (
                <MyClassroomListItem id={item.id} class_name={item.class_name} image={headerImageList[get_rand()]} key={index}/>
            ))}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        myclassroom: state.Classroom.myclassroomlist
    }
}

export default connect(mapStateToProps, {GET_MY_CLASSROOMS_LIST})(MyClassroom)
