import React from "react";
import {makeStyles, Grid, CardMedia, CardContent} from '@material-ui/core';
import programThumbnail from '../../../../res/programThumbnail.jpg'

const useStyles = makeStyles({
    root: {},
    image: {
        width: "100%",
        height: "auto"
    }
})

const ProgramsItem = () => {
    const classes = useStyles()
    return (
        <Grid item>
            <CardMedia image={programThumbnail} className={classes.image}/>
            <CardContent>
                
            </CardContent>
        </Grid>
    )
}
