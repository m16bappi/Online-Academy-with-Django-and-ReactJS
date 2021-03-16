import React from "react";
import {Box, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
        [theme.breakpoints.down('sm')]: {
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
            textDecoration: "none",
            fontFamily: "Playfair Display, serif",
            textAlign: "center",
            fontWeight: 500,

            '&:hover': {
                color: "tomato",
                cursor: "pointer"
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
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            margin: 0,
            height: "28rem"
        }
    }
}))

const BlogItem = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const blogDetails = (id) => {
        history.push(`/blog/${id}`)
    }

    return (
        <Box className={classes.root}>
            <CardMedia image={props.item['cover']} component="img" className={classes.image}/>
            <Box className={classes.container}>
                <Typography variant="h4"
                            onClick={()=>blogDetails(props.item['id'])}>{props.item['title']}</Typography>
                <Typography
                    variant="h6">{props.item['author']} /
                    {new Date(props.item['created_time']).toLocaleString().split('T')[0].replaceAll('/', '-')}</Typography>
                <Box component="p">
                    {props.item['blog'].length >= 320 ? props.item['blog'].substring(0, 320) + '...' : props.item['blog']}
                </Box>
            </Box>
        </Box>
    )
}

export default BlogItem
