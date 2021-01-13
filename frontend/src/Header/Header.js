import React, {useState} from "react";
import {AppBar, Box, Button, Drawer, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import SideBar from "../SideBar/SideBar";

const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
        fontFamily: "Playfair Display, serif"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}))

const Header = () => {
    const classes = useStyles()
    const [sidebar, setSidebar] = useState(false)

    return(
        <Box className={classes.root}>
            <AppBar color={"primary"} position={"fixed"}>
                <Toolbar>
                    <IconButton color={"inherit"} edge={"start"} onClick={()=>setSidebar(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={"h6"} className={classes.title}>
                        BUBT
                    </Typography>
                    <Button variant={"outlined"} color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Drawer anchor={"left"} open={sidebar} onClose={()=>setSidebar(false)}><SideBar /></Drawer>
        </Box>
    )
}

export default Header
