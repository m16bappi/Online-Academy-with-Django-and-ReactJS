import React from "react";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";

import ProgramsItem from "./ProgramsItem/ProgramsItem";

const useStyles = makeStyles((theme)=>({
    root: {
        width: "100%"
    },
    intro: {
        height: "10rem",
        background: "#e7e7e7",
        marginBottom: theme.spacing(5),
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
    }
}))


const Programs = () => {
    const classes = useStyles();
    return(
        <Box>
            <Box className={classes.intro}>
                <Typography variant={"h5"}>All Programs</Typography>
            </Box>
            <Grid container direction={"row"} justify={"center"} spacing={2} className={classes.root}>
                <Grid item xl={3} lg={3} md={5} sm={12} xs={12}>
                    <ProgramsItem title="CSE"/>
                </Grid>
                <Grid item xl={3} lg={3} md={5} sm={12} xs={12}>
                    <ProgramsItem title="BBA"/>
                </Grid>
                <Grid item xl={3} lg={3} md={5} sm={12} xs={12}>
                    <ProgramsItem title="EEE"/>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Programs