import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Box, makeStyles} from "@material-ui/core";

import {getExamList} from "../../../../store/Actions/Classroom/Classroom";
import ExamList from "./Exam/ExamList";
import AssignmentList from "./Assignment/AssignmentList";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme=>({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        '& h4': {
            fontFamily: "Playfair Display, serif",
            fontWeight: 500
        },
        '& h6': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 800
        }
    },
    quiz: {
        minHeight: "10rem"
    },
    assignment: {
        minHeight: "10rem",
        marginTop: "5rem"
    }
}))

const Classworks = (props) => {
    const classes = useStyles()
    const params = useParams()

    useEffect(()=>{
        props.getExamList(params.className)
    }, [])

    return(
        <Box className={classes.root}>
            <Box className={classes.quiz}>
                <ExamList examlist={props.examlist}/>
            </Box>
            <Box className={classes.assignment}>
                <AssignmentList />
            </Box>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        examlist: state.Classroom.examlist
    }
}

export default connect(mapStateToProps, {getExamList})(Classworks)
