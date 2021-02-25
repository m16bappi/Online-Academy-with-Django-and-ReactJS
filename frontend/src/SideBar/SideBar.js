import React from "react";
import {connect} from "react-redux";
import {Avatar, Box, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';

const useStyles = makeStyles((theme)=> ({
    root: {
        width: "20rem",
        height: "100vh"
    },
    profile: {
        width: "100%",
        height: "25rem",
        display: "flex",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        '&>:nth-child(2)': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            textTransform: "capitalize"
        }
    },
    image: {
        width: "50%",
        height: "auto",
        boxShadow: theme.shadows[10]
    }
}))

const menuItems = [
    {
        liIcon: <HomeIcon />,
        liText: "Home",
        liLink: "/"
    },
    {
        liIcon: <MenuBookIcon />,
        liText: "Classroom",
        liLink: "/myClassroom"
    },
    {
        liIcon: <MenuBookIcon />,
        liText: "Dashboard",
        liLink: "/dashboard"
    },
    {
        liIcon: <CastForEducationIcon />,
        liText: "Program",
        liLink: "/programs"
    },
    {
        liIcon: <InfoIcon />,
        liText: "About",
        liLink: "/"
    }
]

const SideBar = (props) => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
            {props.isAuthenticated ?
                <Box className={classes.profile}>
                    <Avatar variant="square" src={props.profile.photo} className={classes.image}/>
                    <Typography variant="h6">{props.user.status}</Typography>
                    <Typography>user: {props.user.username}</Typography>
                    <Typography>phone: {props.profile.phone}</Typography>
                </Box>
            :null}
            <List>
                {menuItems.filter(value =>(props.isAuthenticated ? props.user.status === 'teacher' ?
                    value.liText !== 'Classroom' : value.liText !== 'Dashboard' : value.liText !== 'Classroom' && value.liText !== 'Dashboard'))
                    .map((item, key) => (
                    <ListItem key={key} button divider component={Link} to={item.liLink}>
                        <ListItemIcon>{item.liIcon}</ListItemIcon>
                        <ListItemText primary={item.liText}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth.user,
        profile: state.Auth.profile
    }
}

export default connect(mapStateToProps)(SideBar)
