import React from "react";
import {connect} from "react-redux";
import {Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    root: {
        margin: theme.spacing(2),
        '& h4': {
            fontFamily: "Playfair Display, serif",
            fontWeight: 500
        },
        '& h6': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600
        }
    },
    listItems:{
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(2)
    },
    studentHeader: {
        marginTop: theme.spacing(10),
        marginRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
}))

const People = (props) => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
            <Typography variant='h4'>Teacher</Typography>
            <Divider />
            <Box className={classes.listItems}>
                <Avatar>{props.peoples.course_teacher.charAt(0)}</Avatar>
                <Typography variant="h6">{props.peoples.course_teacher}</Typography>
            </Box>

            <Box className={classes.studentHeader}>
                <Typography variant="h4">Students</Typography>
                <Typography variant='h4'>{props.peoples.students.length}</Typography>
            </Box>
            <Divider />

            {props.peoples.students.map((items, index)=>(
                <Box className={classes.listItems} key={index}>
                    <Avatar>{items.charAt(0)}</Avatar>
                    <Typography variant="h6">{items}</Typography>
                </Box>
            ))}
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        peoples: state.Classroom.classroom
    }
}

export default connect(mapStateToProps)(People)
