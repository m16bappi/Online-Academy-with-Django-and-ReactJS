import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

class AddBlog extends Component {
    constructor(props) {
        super(props),
            this.state = {
                title: '',
                blog: ''
            }
    }

    onChangeHandler(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler() {
        this.props.ADD_BLOGS(this.state)
        this.props.onHide()
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                centered
                size={'lg'}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' name='title' onChange={event => this.onChangeHandler(event)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Blog Details</Form.Label>
                        <Form.Control as='textarea' rows='3' name='blog' onChange={event => this.onChangeHandler(event)} />
                    </Form.Group>

                    <Button variant='success' onClick={() => this.onSubmitHandler()} >Submit</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddBlog