import React from "react";
import {connect} from "react-redux";
import {GET_BLOGS, ADD_BLOGS} from "../../store/Actions/Blogs/Blogs";
import {Box, makeStyles} from "@material-ui/core";
import BlogItem from "./BlogItem/Blogitem";

import Filter from "./Filter";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "3rem",
        display: "flex",
        flexDirection: "row",
        gap: "3rem",
        [theme.breakpoints.down('sm')] : {
            flexDirection: "column-reverse"
        }
    },
    container: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    },
    filter: {
        width: "30%",
        height: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    }
}))

const Blogs = (props) => {
    const classes = useStyles()
    return(
        <Box className={classes.root}>
           <Box className={classes.container}>
               {props.Blogs.map((item, index)=> (
                   <BlogItem item={item} key={index}/>
               ))}
           </Box>
           <Box className={classes.filter}>
               <Filter />
           </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        Blogs: state.Blogs.Blogs
    }
}

export default connect(mapStateToProps, {GET_BLOGS, ADD_BLOGS})(Blogs)
