import React from "react";
import {List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minHeight: "30rem",
        width: "20rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#fff"
    }
})

const ExamParticipantList = (props) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <List>
                {props.list ? props.list.map((item, index)=> (
                    <ListItem key={index} divider>
                        <ListItemText primary={item['student_name']}/>
                        <ListItemSecondaryAction>{item['obtain_marks']}</ListItemSecondaryAction>
                    </ListItem>
                )): null}
            </List>
        </div>
    )
}

export default ExamParticipantList
