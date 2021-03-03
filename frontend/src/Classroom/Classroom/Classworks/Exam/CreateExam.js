import React, {useState} from "react";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "30rem",
        height: "40rem",
        background: "white",
        borderRadius: "5px"
    }
})

const CreateExam = () => {
    const classes = useStyles()
    const [select, setSelect] = useState(0)

    return (
        <Box className={classes.root}>
            mehedi
        </Box>
    )
}

export default CreateExam
