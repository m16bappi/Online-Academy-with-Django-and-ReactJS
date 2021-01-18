import React from "react";
import {Box, List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const useStyles = makeStyles((theme)=> ({
    root: {
        width: theme.spacing(30),
        height: "100vh"
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

const SideBar = () => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
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

export default SideBar
