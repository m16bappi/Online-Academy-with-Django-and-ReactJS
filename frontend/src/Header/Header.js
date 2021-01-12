import React from "react";
import {AppBar, Box, Button, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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

    return(
        <Box className={classes.root}>
            <AppBar color={"primary"} position={"fixed"}>
                <Toolbar>
                    <IconButton color={"inherit"} edge={"start"}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={"h6"} className={classes.title}>
                        BUBT
                    </Typography>
                    <Button variant={"outlined"} color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    )
}

export default Header
