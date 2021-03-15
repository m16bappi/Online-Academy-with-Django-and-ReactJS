import React from "react";
import {Box, Button, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles({
    root: {
        width: "25rem",
        height: "35rem",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
    },
    list: {
        width: "100%"
    }
})

const AssignmentParticipantList = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <List className={classes.list}>
                {props.list ? props.list.map((item, index) => (
                    <ListItem key={index} divider>
                        <ListItemText primary={item["student_name"]}/>
                        <ListItemSecondaryAction><Button href={item.file}
                                                         download><GetAppIcon/></Button></ListItemSecondaryAction>
                    </ListItem>
                )) : null}
            </List>
        </Box>
    )
}

export default AssignmentParticipantList