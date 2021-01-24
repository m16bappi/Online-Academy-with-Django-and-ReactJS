import React from "react";
import {useLocation, Link} from "react-router-dom";
import {makeStyles, CardMedia, CardContent, Typography, Card, CardActionArea, Box} from '@material-ui/core';
import programThumbnail from '../../../../res/programThumbnail.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        textDecoration: "none",
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[5]
        }
    },
    media: {
        height: "15rem"
    },
    title: {
        borderTop: "5px solid tomato"
    }
}))

const ProgramsItem = (props) => {
    const classes = useStyles()
    const location = useLocation()
    console.log(props)

    return (
        <Box className={classes.root} component={Link} to={`${location.pathname}/${props.title}`}>
            <Card>
                <CardActionArea>
                    <CardMedia image={"/static/bundles/" + programThumbnail} className={classes.media}/>
                    <CardContent className={classes.title}>
                        <Typography variant={"h6"}>{props.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default ProgramsItem
