import React from 'react';
import {Box, Typography} from "@material-ui/core";
import Blogs from "../Blogs/Blogs";

const Home = () => {
    return(
        <Box>
            <Typography>This is home page</Typography>
            <Blogs />
        </Box>
    )
}

export default Home
