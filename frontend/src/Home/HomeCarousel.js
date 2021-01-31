import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {CardMedia, makeStyles} from '@material-ui/core'

import img1 from "./CarouselImage/carousel (1).jpg"
import img2 from "./CarouselImage/carousel (2).jpg"
import img3 from "./CarouselImage/carousel (3).jpg"
import img4 from "./CarouselImage/carousel (4).jpg"

const useStyles = makeStyles(theme => ({
    media: {
        width: "auto",
        height: "30rem"
    }
}))

const HomeCarousel = () => {
    const images = [img1, img2, img3, img4];

    return (
        <Carousel indicators={false}>
            {
                images.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

const Item = (props) => {
    const classes = useStyles()

    return (
        <CardMedia image={"/static/bundles/" + props.item} className={classes.media}/>
    )
}

export default HomeCarousel
