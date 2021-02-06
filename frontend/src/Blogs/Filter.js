import React from "react";
import {Box, Button, Divider, makeStyles, List, ListItem, ListItemText, Avatar} from "@material-ui/core";

const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        flexDirection: "column"
    }
}))

const list = ['CSE', 'BBA', 'EEE', 'ENGLISH', 'ECONOMICS']

const Filter = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Button variant="contained" color="primary" fullWidth>create</Button>
            <Divider />
            <List>
                <ListItem button>
                    <Avatar>A</Avatar>
                    <ListItemText primary={"CSE"} />
                </ListItem>
            </List>
        </Box>
    )
}

export default Filter
