import React, {useState} from "react";
import {connect} from "react-redux";
import {
    Avatar,
    Backdrop,
    Button,
    FormControl,
    FormGroup,
    makeStyles,
    Modal,
    TextField,
    Fade,
    Box, Typography
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {USER_LOGIN} from "../../store/Actions/Auth/Login";


const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    formGroup: {
        width: "20rem",
        height: "30rem",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        outline: "none"
    },
    formIcon: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(5),
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    formItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    loginSuccess: {
        width: "20rem",
        height: "30rem",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        outline: "none"
    },
    loginSuccessIcon: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: theme.spacing(5),
        background: theme.palette.success.main
    },
    loginSuccessText: {
        fontFamily: "Playfair Display, serif",
        color: "green",
        marginBottom: theme.spacing(5)
    }
}))


const Auth = (props) => {
    const classes = useStyles()
    const {isAuthenticated} = props.auth
    const [auth, setAuth] = useState({
        username: "",
        password: ""
    })
    const onChangeHandler = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = () => {
        props.USER_LOGIN(auth.username, auth.password)
    }

    const loginForm = (
        <Fade in={props.open}>
                <FormGroup className={classes.formGroup} aria-autocomplete={"none"}>
                    <FormControl>
                        <Avatar className={classes.formIcon}><AccountCircleIcon style={{fontSize: 40}}/></Avatar>
                    </FormControl>
                    <FormControl className={classes.formItem}>
                        <TextField name="username" variant="outlined" label="username" onChange={(event)=>onChangeHandler(event)}/>
                    </FormControl>
                    <FormControl className={classes.formItem}>
                        <TextField name="password" variant="outlined" label="password" onChange={(event)=>onChangeHandler(event)}/>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" color="primary" onClick={onSubmitHandler} className={classes.formItem}>login</Button>
                    </FormControl>
                </FormGroup>
            </Fade>
    )

    const loginSuccess = (
        <Box className={classes.loginSuccess}>
            <Avatar className={classes.loginSuccessIcon}><CheckCircleIcon fontSize="large"/></Avatar>
            <Typography variant="h4" className={classes.loginSuccessText}>Success</Typography>
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

export default connect(mapStateToProps, {USER_LOGIN})(Auth)
