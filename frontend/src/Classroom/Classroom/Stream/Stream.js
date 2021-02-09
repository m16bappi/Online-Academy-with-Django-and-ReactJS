import React, {useState} from "react";
import {Box, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2)
    },
    textArea: {}
}))

const Stream = (props) => {

    const classes = useStyles()
    const [value, setValue] = useState('')


    return(
        <Box className={classes.root}>
            <Box className={classes.textArea}>
                <TextField multiline={true}
                rows={3} rowsMax={5} fullWidth={true} variant={"outlined"} color={"primary"}
                />
            </Box>
        </Box>
    )
}

export default Stream
