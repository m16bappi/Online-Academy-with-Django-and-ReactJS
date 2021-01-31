import React from 'react';
import {Container, makeStyles} from '@material-ui/core'
import HomeCarousel from "./HomeCarousel";
import Blogs from "../Blogs/Blogs";

const useStyles = makeStyles(theme=> ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    }
}))

const Home = () => {
    const classes = useStyles()

    return(
        <Container className={classes.container}>
            <HomeCarousel />
            <Blogs />
        </Container>
    )
}

export default Home
