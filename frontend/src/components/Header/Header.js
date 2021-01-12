import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_LOGIN, USER_LOGOUT } from '../../../store/Actions/Auth/Login';
import { USER_REGISTER } from '../../../store/Actions/Auth/Register';
import logo from "../../../../res/bubt-logo.png"
import Register from '../Auth/Register';
import Login from '../Auth/Login';

class Header extends Component {

    constructor(props) {
        super(props),
            this.state = {
                Login: false,
                Register: false
            }
    }

    loginOpenHandler = () => {
        this.setState({
            ...this.state,
            Login: true
        })
    }
    LoginCloseHandler = () => {
        this.setState({
            ...this.state,
            Login: false
        })
    }
    RegisterOpenHandler = () => {
        this.setState({
            ...this.state,
            Register: true
        })
    }
    RegisterCloseHandler = () => {
        this.setState({
            ...this.state,
            Register: false
        })
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const AuthLink = (
            <ul className="navbar-nav ml-auto">
                <span className='navbar-text mr-1'>
                    <strong>
                        {user ? `welcome ${user.username}` : ''}
                    </strong>
                </span>
                <li className="nav-item active">
                    <button className="btn btn-danger btn-md" onClick={this.props.USER_LOGOUT}>Logout</button>
                </li>
            </ul>
        );

        const GuestLink = (
            <Form inline>
                <Button variant='outline-success' className="mr-2" onClick={() => this.loginOpenHandler()}>Login</Button>
                <Button variant="outline-success" onClick={() => this.RegisterOpenHandler()}>Register</Button>

                <Login show={this.state.Login}
                    USER_LOGIN={(username, password) => this.props.USER_LOGIN(username, password)}
                    onHide={() => this.LoginCloseHandler()} />
                <Register show={this.state.Register} onHide={() => this.RegisterCloseHandler()}
                    USER_REGISTER={(username, email, password) => this.props.USER_REGISTER(username, email, password)} />
            </Form>
        );

        return (
            <div className="shadow-sm rounded">
                <Navbar bg="white" expand="md" sticky="top">
                    <Navbar.Brand className='ml-5' as={Link} to='/'>
                        <Image src={"/static/bundles/" + logo}
                            width="40"
                            height="50"
                            className="d-inline-block align-top" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link>Programs</Nav.Link>
                            <Nav.Link>Course</Nav.Link>
                            <Nav.Link as={Link} to='/blogs'>Blog</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                        </Nav>
                        {isAuthenticated ? AuthLink : GuestLink}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.Login
    }
};
export default connect(mapStateToProps, { USER_LOGIN, USER_LOGOUT, USER_REGISTER })(Header);
