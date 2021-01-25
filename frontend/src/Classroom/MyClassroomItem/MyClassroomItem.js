import React from "react";
import {Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme=> ({
    root: {
        width: "25rem",
        height: "15rem",
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

const MyClassroomItem = (props) => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
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

export default MyClassroomItem
