import React from "react";
import {connect} from "react-redux";
import {GET_BLOGS, ADD_BLOGS} from "../../store/Actions/Blogs/Blogs";
import {Box, makeStyles} from "@material-ui/core";
import BlogItem from "./BlogItem/Blogitem";

import BlogImage from "./BlogImage/BlogHeader.jpg";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "3rem",
        display: "flex",
        flexDirection: "row",
        gap: "3rem",
        [theme.breakpoints.down('md')] : {
            flexDirection: "column-reverse"
        }
    },
    container: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            width: "100%"
        }
    },
    filter: {
        width: "auto"
    }
}))

const Blogs = () => {
    const classes = useStyles()

    return(
        <Box className={classes.root}>
           <Box className={classes.container}>
               <BlogItem image={BlogImage}/>
               <BlogItem image={BlogImage}/>
               <BlogItem image={BlogImage}/>
               <BlogItem image={BlogImage}/>
               <BlogItem image={BlogImage}/>
           </Box>
           <Box className={classes.filter}>
               Category
           </Box>
        </Box>
    )
}

export default connect(null, {GET_BLOGS, ADD_BLOGS})(Blogs)
