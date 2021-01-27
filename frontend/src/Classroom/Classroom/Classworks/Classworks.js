import React from "react";
import Countdown from "react-countdown";
import {Box, Divider, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        '& h4': {
            fontFamily: "Playfair Display, serif",
            fontWeight: 500
        }
    },
    quiz: {
        minHeight: "15rem"
    },
    assignment: {
        minHeight: "15rem"
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        '&:hover': {
            boxShadow: theme.shadows[1],
            background: "#E8F0FE",
            transition: "0.3s"
        }
    }
}))

const Classworks = () => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
            <Box className={classes.quiz}>
                <Typography variant="h4">Quiz</Typography>
                <Divider />
            </Box>
            <Box className={classes.assignment}>
                <Typography variant="h4">Assignments</Typography>
                <Divider />
                <Box className={classes.listItem}>
                    <Typography variant="h6">Exam name</Typography>
                    <Countdown date={Date.now() + 10000}/>
                </Box>
            </Box>
        </Box>
    )
}

export default Classworks
