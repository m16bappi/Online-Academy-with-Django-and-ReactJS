import React from "react";
import {List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        height: "40rem",
        width: "30rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff"
    }
})

const ExamParticipantList = (props) => {
    const classes = useStyles()
    console.log(props.list)
    return(
        <div className={classes.root}>
            <List>
                {props.list ? props.list.map((item, index)=> (
                    <ListItem key={index}>
                        <ListItemText primary={item['student_name']}/>
                        <ListItemSecondaryAction>{item['obtain_marks']}</ListItemSecondaryAction>
                    </ListItem>
                )): null}
            </List>
        </div>
    )
}

export default ExamParticipantList
