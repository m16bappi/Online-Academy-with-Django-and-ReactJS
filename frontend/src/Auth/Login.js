import React, {useState} from "react";
import {connect} from "react-redux";
import {
    Avatar,
    Backdrop,
    Button,
    makeStyles,
    Modal,
    TextField,
    Fade,
    Box, FormGroup, Link
} from "@material-ui/core";
import login from "./Icons/login.png";
import register from "./Icons/register.png";
import success from "./Icons/success.png";

import {USER_LOGIN} from "../../store/Actions/Auth/Login";


const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "20rem",
        height: "30rem",
        background: "white",
        outline: "none",
        borderRadius: "5px"
    },

    formGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        '&>:nth-child(1)': {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
            width: theme.spacing(12),
            height: theme.spacing(12)
        },
        '&>:nth-child(5)': {
            color: "grey",
            fontSize: "larger",
            alignSelf: "flex-end",
            marginTop: theme.spacing(2)
        }
    },
    loginSuccess: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    loginSuccessIcon: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginBottom: theme.spacing(5)
    }
}))

const Login = (props) => {
    const classes = useStyles()
    const {isAuthenticated} = props.auth
    const [auth, setAuth] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState({
        'username': false,
        'password': false
    })
    const onChangeHandler = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: false
        })
    }

    const onSubmitHandler = () => {
        if(auth.username.length && auth.password.length) {
            props.USER_LOGIN(auth.username, auth.password)
        }
        else if(!auth.username.length && !auth.password.length){
            setError({
                ...error,
                username: true,
                password: true
            })
        }
        else if(!auth.username.length){
            setError({
                ...error,
                username: true
            })
        } else if(!auth.password.length){
            setError({
                ...error,
                password: true
            })
        }
    }

    const loginForm = (
        <Fade in={props.open}>
                <Box className={classes.container}>
                    <FormGroup className={classes.formGroup} aria-autocomplete={"none"}>
                        <Avatar src={"/static/bundles/"+login} variant={"square"}/>
                        <TextField name="username" variant="outlined" label="username" fullWidth error={error.username}
                                   helperText={error.username ? 'Enter username': ' '}
                                   onChange={(event)=>onChangeHandler(event)}/>
                        <TextField name="password" variant="outlined" label="password" fullWidth  error={error.password}
                                   helperText={error.password ? 'Enter password': ' '}
                                   onChange={(event)=>onChangeHandler(event)}/>
                        <Button variant="contained" color="primary" onClick={onSubmitHandler} fullWidth>login</Button>
                        <Link component="button">SIGN UP</Link>
                    </FormGroup>
                </Box>
            </Fade>
    )

    const loginSuccess = (
        <Box className={classes.loginSuccess}>
            <Avatar className={classes.loginSuccessIcon} src={"/static/bundles/"+success} variant={"square"}/>
            <Button onClick={()=>props.onClose()} variant="contained" color="primary" size="large">OK</Button>
        </Box>
    )

    return(
        <Modal open={props.open} onClose={()=>props.onClose()} className={classes.root}
        closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}} disableEnforceFocus={true}
        >
            {isAuthenticated? loginSuccess: loginForm}
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth
    }
}

export default connect(mapStateToProps, {USER_LOGIN})(Login)
