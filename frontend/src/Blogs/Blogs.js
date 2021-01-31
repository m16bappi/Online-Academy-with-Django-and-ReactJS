import React from "react";
import {connect} from "react-redux";
import {GET_BLOGS, ADD_BLOGS} from "../../store/Actions/Blogs/Blogs";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {}
}))

const Blogs = () => {
    const classes = useStyles()

    return(
        <Box>
           <Box>
               Header
           </Box>
           <Box>
               <Box>
                   Blogs
               </Box>
               <Box>
                   Category
               </Box>
           </Box>
        </Box>
    )
}

export default connect(null, {GET_BLOGS, ADD_BLOGS})(Blogs)
