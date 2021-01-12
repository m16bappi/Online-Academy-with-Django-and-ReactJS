import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default class Register extends Component {

    constructor(props) {
        super(props),

            this.state = {
                username: '',
                email: '',
                password: '',
                password2: ''
            }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClickHandler() {
        if (this.state.password !== this.state.password2) {
            alert(() => {
                console.log('password not same')
            })
        } else {
            this.props.USER_REGISTER(this.state.username, this.state.email, this.state.password)
        }
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    centered
                    size={"md"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" name="username" onChange={(event) => this.onChangeHandler(event)} />
                            <Form.Text className="text-muted">Use unique username</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(event) => this.onChangeHandler(event)} />
                            <Form.Text className="text-muted">use your personal email</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={(event) => this.onChangeHandler(event)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password2" onChange={(event) => this.onChangeHandler(event)} />
                            <Form.Text className="text-muted">Don't share your password with others</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Check type="checkbox" label="Everything ok ?" />
                        </Form.Group>

                        <Button type="submit" variant="success"
                            onClick={() => this.onClickHandler()}>Submit</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
