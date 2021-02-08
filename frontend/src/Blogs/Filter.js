import React from "react";
import {
    Box,
    Button,
    Divider,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Avatar,
    ListItemAvatar, ListItemSecondaryAction
} from "@material-ui/core";

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
                {list.map(item=>(
                    <ListItem button divider={true}>
                        <ListItemAvatar><Avatar>{item.charAt(0)}</Avatar></ListItemAvatar>
                        <ListItemText primary={item}/>
                        <ListItemSecondaryAction>
                            <ListItemText primary={5}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Filter
