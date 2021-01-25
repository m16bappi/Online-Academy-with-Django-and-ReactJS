import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Box} from "@material-ui/core";

import {GET_MY_CLASSROOMS} from "../../store/Actions/Classroom/Classroom";

const MyClassroom = (props) => {

    useEffect(()=>{
        props.GET_MY_CLASSROOMS()
    }, [])

    return(
        <Box>
            my classroom
        </Box>
    )
}

const mapStateToProps = (state) => {
    return{
        myclassroom: state.Classroom.myclassroom
    }
}

export default connect(mapStateToProps, {GET_MY_CLASSROOMS})(MyClassroom)
