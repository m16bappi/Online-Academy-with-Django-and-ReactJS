import React from "react";
import {Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles(theme=> ({
    root: {
        width: "25rem",
        height: "15rem",
        textDecoration: "none",
        margin: theme.spacing(2),
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[5]
        }
    },
    cardRoot: {
        paddingBottom: 0
    },
    media: {
        height: "15rem"
    },
    cardContent: {
        borderTop: "5px solid tomato",
        '&:last-child': {
            paddingBottom: 0
        }
    }
}))

const MyClassroomListItem = (props) => {
    const classes = useStyles()
    const location = useLocation()
    return(
        <Box className={classes.root} component={Link} to={`${location.pathname}/${props.id}`}>
            <Card className={classes.cardRoot}>
                <CardActionArea>
                    <CardMedia image={"/static/bundles/" + props.image} className={classes.media}/>
                    <CardContent className={classes.cardContent}>
                        <Typography variant={"h6"}>{props.class_name}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default MyClassroomListItem
