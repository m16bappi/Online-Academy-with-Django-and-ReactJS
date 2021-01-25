import React from "react";
import {connect} from "react-redux";
import {GET_BLOGS, ADD_BLOGS} from "../../store/Actions/Blogs/Blogs";
import {Box} from "@material-ui/core";

const Blogs = () => {
    return(
        <Box>
            Blogs
        </Box>
    )
}

export default connect(null, {GET_BLOGS, ADD_BLOGS})(Blogs)
