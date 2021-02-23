import React from "react";
import {connect} from "react-redux";
import {Avatar, Box, List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const useStyles = makeStyles(()=> ({
    root: {
        width: "20rem",
        height: "100vh"
    },
    profile: {
        width: "100%",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
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
        liIcon: <SportsKabaddiIcon/>,
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
            <Box className={classes.profile}>
                <Avatar variant="square" src={props.profile.photo}/>
            </Box>
            <List>
                {menuItems.map((item, key) => (
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
        user: state.Auth.user,
        profile: state.Auth.profile
    }
}

export default connect(mapStateToProps)(SideBar)
