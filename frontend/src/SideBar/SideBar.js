import React from "react";
import {Box, List, ListItem, makeStyles} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const useStyles = makeStyles(theme=> ({
    root: {
        height: "100vh",
        width: "10%"
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
        liLink: "/"
    },
    {
        liIcon: <SportsKabaddiIcon/>,
        liText: "Program",
        liLink: "/"
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
        <Box>

        </Box>
    )
}

