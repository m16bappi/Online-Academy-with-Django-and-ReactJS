import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props),
            this.state = {
                username: '',
                password: ''
            }
    }

    onChangeHandler(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onClickHandler() {

    }

    render() {
        return (
            <div>
                <Modal
                    show = {this.props.show} onHide={this.props.onHide}
                    centered
                    aria-labelledby="contained-modal-title-vcenter"
                    size={"md"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter username" name="username" onChange={(event) => this.onChangeHandler(event)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(event) => this.onChangeHandler(event)} />
                            </Form.Group>
                        </Form>
                        <Button variant="success" size="md" type="submit"
                            onClick={() => this.props.USER_LOGIN(this.state.username, this.state.password)}
                        >Login</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Login;
