import React from "react";
import {connect} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {makeStyles, CardMedia, CardContent, Typography, Card, CardActionArea, Box} from '@material-ui/core';
import programThumbnail from '../../../../res/programThumbnail.jpg'

import {GET_INTAKE} from "../../../store/Actions/Program/Program";

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
    const history = useHistory()

    const urlHandler = () => {
        props.GET_INTAKE(props.title)
        history.push(`${location.pathname}/${props.title}`)
    }

    return (
        <Box className={classes.root} onClick={()=>urlHandler()}>
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

export default connect(null, {GET_INTAKE})(ProgramsItem)
