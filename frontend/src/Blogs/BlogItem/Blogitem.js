import React from "react";
import {Box, CardMedia, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme=>({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "45rem",
        '&:hover': {
            '& img': {
                cursor: "pointer",
                filter: "grayscale(50%)"
            }
        }
    },
    image: {
        height: "25rem",
        width: "100%",
        [theme.breakpoints.down('md')] : {
            height: "15rem"
        }
    },
    container: {
        zIndex: 1,
        width: "90%",
        height: "20rem",
        marginTop: "-5rem",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "5px solid tomato",
        background: "white",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        '&:hover': {
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
            transition: "0.3s"
        },
        '& h4': {
            fontFamily: "Playfair Display, serif",
            textAlign: "center",
            fontWeight: 500,
            '&:hover': {
                color: "tomato"
            }
        },
        '& h6': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600,
            color: "grey"
        },
        '& p': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: 600,
            textAlign: "justify"
        },
        [theme.breakpoints.down('md')] : {
            width: "100%",
            margin: 0,
            height: "28rem"
        }
    }
}))

const BlogItem = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <CardMedia image={"/static/bundles/" + props.image} component="img" className={classes.image}/>
            <Box className={classes.container}>
                <Typography variant="h4">Voices from a Melting World</Typography>
                <Typography variant="h6">Mehedi / 10-02-2021</Typography>
                <Box component="p">
                    For 117 hours I waited as temperatures plummeted as low as -50°C and winds gusted up to 60 km/h,
                    hoping to witness the rare moment when a mother polar bear and her new cubs would leave their den for the very first time.
                    Today, Arctic sea ice is melting faster than ever before, leaving polar bears vulnerable and hungry.
                </Box>
            </Box>
        </Box>
    )
}

export default BlogItem
