import React from "react";
import {Box, Divider, makeStyles, Typography} from "@material-ui/core";
import Countdown from "react-countdown";

const useStyles = makeStyles(theme=>({
    listItemRoot: {
        borderRadius: '5px',
        '&:hover': {
            boxShadow: theme.shadows[3],
            transition: "0.3s"
        }
    },
    listItem: {
        height: "3rem",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        '&:hover': {
            background: "#E8F0FE",
            transition: "0.3s",
            cursor: "pointer"
        }
    },
    listItemCollapse: {
        minHeight: "5rem",
        paddingLeft: theme.spacing(2),
        paddingRight:theme.spacing(2),
        '& p': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600
        },
        '& div': {
            height: "3rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
        }
    },
    active: {
        boxShadow: theme.shadows[2]
    }
}))

const works = ['work1', 'work2', 'work3', 'work4', 'work5', "work6"]

const AssignmentList = (props) => {
    const classes = useStyles()

    return(
        <Box>
            <Typography variant="h4">Assignments</Typography>
                <Divider />
                <br/>
                {works.map((item, index)=> (
                    <Box className={classes.listItem} key={index}>
                        <Typography variant="h6">{item}</Typography>
                        <Countdown date={Date.now() + 10000}/>
                    </Box>
                ))}
        </Box>
    )
}

export default AssignmentList
