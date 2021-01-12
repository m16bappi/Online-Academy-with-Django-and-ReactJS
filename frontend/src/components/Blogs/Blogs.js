import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { GET_BLOGS, ADD_BLOGS } from '../../../store/Actions/Blogs/Blogs';
import AddBlog from './AddBlog/AddBlog';

class Blogs extends Component {
    constructor(props) {
        super(props),

            this.state = {
                show: false,
            }
    }

    componentDidMount() {
        this.props.GET_BLOGS()
    }

    onShowHandler() {
        this.setState({
            ...this.state,
            onHide: true
        })
    }
    
    onHideHandler() {
        this.setState({
            ...this.state,
            onHide: false
        })
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const blogPost = (
            <div className='mt-3'>
                <Button variant='primary' onClick={() => this.onShowHandler()}>Create Post</Button>
                <AddBlog show={this.state.onHide} onHide={() => this.onHideHandler()} ADD_BLOGS={(blog) => this.props.ADD_BLOGS(blog)} />
            </div>
        )
        return (
            <Container>
                {isAuthenticated ? blogPost : null}
                {this.props.blogs.map(item => (
                    <div className='mt-3' key={item.id}>
                        <Card bg='white'>
                            <Card.Header>
                                <Card.Text className='h4'>
                                    <Link to={`${this.props.match.url}/${item.id}`}>{item.title}</Link>
                                </Card.Text>
                                <Card.Text>
                                    Auther: {item.author}
                                </Card.Text>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text className='lead'>
                                    {item.blog}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant='success'>Like {Object.keys(item.likes).length} </Button>
                                <Button variant='primary' className='float-right' >Comment</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.Blogs.Blogs,
        auth: state.Login
    }
}

export default connect(mapStateToProps, { GET_BLOGS, ADD_BLOGS })(Blogs)