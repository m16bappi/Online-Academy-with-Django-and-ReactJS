import React, {useState} from "react";
import {Box, Avatar, makeStyles, Stepper, RadioGroup, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "30rem",
        height: "35rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        borderRadius: "5px"
    },
    body: {}
}))

const Registration = (props) => {
    const classes = useStyles()
    const [select, setSelect] = useState(false)
    const [user, setUser] = useState({
        'username': '',
        'email': '',
        'password1': '',
        'password2': ''
    })
    const [st, setSt] = useState({})
    const [th, setTh] = useState({})

    return (
        <Box className={classes.root}>
            <Typography variant="h4">Registration</Typography>
        </Box>
    )
}

export default Registration
