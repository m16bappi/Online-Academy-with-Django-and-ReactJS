import React from "react";
import {connect} from "react-redux";
import {Container, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";


const BlogDetails = (props) => {
    const params = useParams().id
    return (
        <Container>
            {props.Blog ? props.Blog.filter(item => item.id === parseInt(params)).map((value, index) => (
                <div key={index}>
                    <img src={value['cover']} alt={' '}/>
                    <Typography variant="h1">{value['title']}</Typography>
                    <Typography>{value['blog']}</Typography>
                </div>
            )) : null}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        Blog: state.Blogs.Blogs
    }
}

export default connect(mapStateToProps)(BlogDetails)
