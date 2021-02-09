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
    ListItemAvatar, ListItemSecondaryAction, Typography
} from "@material-ui/core";
import {connect} from "react-redux";

const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        flexDirection: "column",
        '& h5': {
            fontFamily: "Playfair Display, serif",
            fontWeight: "600",
            borderBottom: "2px solid black"
        }
    }
}))

const list = ['CSE', 'BBA', 'EEE', 'ENGLISH', 'ECONOMICS']

const Filter = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {props.isAuthenticated ?
                <Box>
                    <Button variant="contained" color="primary" fullWidth>Create Blog</Button>
                    <Divider />
                </Box> : <Typography variant="h5">Filter</Typography>
            }
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Filter)
