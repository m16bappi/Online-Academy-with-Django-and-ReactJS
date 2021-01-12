import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import { DELETE_BLOGS } from '../../../../store/Actions/Blogs/Blogs'
import { Link } from 'react-router-dom';

class BlogDetails extends Component {

    constructor() {
        super(),
            this.state = {
                Blog: []
            }
    }

    componentDidMount() {
        Axios.get(`api/blogs/details/${parseInt(this.props.match.params.id)}/`)
            .then(res => {
                this.setState({
                    Blog: res.data
                })
            }).catch(err => console.log(err))
    }

    onClickHandler() {
        this.props.DELETE_BLOGS(parseInt(this.props.match.params.id))
    }

    render() {
        let flag = false, size = 12;
        const { isAuthenticated, user } = this.props.auth;
        if (isAuthenticated && (user.username === this.state.Blog.author)) {
            flag = true
            size = 10
        }

        const EditAndDelete = (
            <Form inline>
                <Button variant='outline-primary mx-1 my-1'>Edit</Button>
                <Button variant='outline-danger mx-1 my-1' onClick={() => this.onClickHandler()} as={Link} to='/blogs' >Delete</Button>
            </Form>
        )

        return (
            <div>
                <Container className='mt-3'>
                    <Row>
                        <Col sm={size}>
                            <p className='h2 font-weight-normal'>{this.state.Blog.title}</p>
                            <h5 className='font-weight-normal'>Author: {this.state.Blog.author} </h5>
                        </Col>
                        <Col sm={2} className='mt-2'>
                            {flag ? EditAndDelete : null}
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <p className='lead'> {this.state.Blog.blog} </p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4} className='d-flex justify-content-center pr-0'><Button variant='light w-100'>Like</Button></Col>
                        <Col sm={4} className='d-flex justify-content-center px-0'><Button variant='light w-100'>Comment</Button></Col>
                        <Col sm={4} className='d-flex justify-content-center pl-0'><Button variant='light w-100'>Share</Button></Col>
                    </Row>
                    <hr />
                </Container>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.Login
    }
}

export default connect(mapStateToProps, { DELETE_BLOGS })(BlogDetails)
