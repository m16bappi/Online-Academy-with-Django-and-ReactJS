import React, {useState} from "react";
import {
    Box,
    makeStyles,
    Stepper,
    RadioGroup,
    Step,
    StepLabel,
    TextField,
    Button,
    FormControlLabel, Radio
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: "30rem",
        height: "40rem",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "5px"
    },
    body: {
        paddingRight: "4rem",
        paddingLeft: "4rem"
    },
    stepper: {
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    account: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem"
    }

}))

const steps = ['Account', 'Personal', 'Picture', 'Submit']

const Registration = () => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [user, setUser] = useState({
        'username': '',
        'email': '',
        'password1': '',
        'password2': ''
    })
    const [mode, setMode] = useState('student')
    const [st, setSt] = useState({})
    const [th, setTh] = useState({})

    const onChangeHandler = (event) => {
        if (activeStep === 0)
        {
            setUser({
                ...user,
                [event.target.name]: event.target.value
            })
        }
        else if(mode === 'student')
        {
            setSt({
                ...st,
                [event.target.name]: event.target.value
            })
        }
        else if(mode === 'teacher')
        {
            setTh({
                ...th,
                [event.target.name]: event.target.value
            })
        }
    }

    const nextHandler = () =>{
        if (activeStep !== steps.length-1)
        setActiveStep(prevActiveStep => prevActiveStep + 1)

    }

    const preHandler = () =>{
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const controller = (
        <Box>
            <Button disabled={activeStep === 0} onClick={preHandler} className={classes.backButton}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={nextHandler}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
        </Box>
    )

    const account = (
        <Box className={classes.account}>
            <TextField variant={"outlined"} color={"primary"} name="username"
                       helperText={' '}
                       label={"username"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="email"
                       helperText={' '}
                       label={"email"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password"
                       helperText={' '}
                       label={"password"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password"
                       helperText={' '}
                       label={"password"} onChange={onChangeHandler}/>
           <RadioGroup row value={mode}>
               <FormControlLabel value="student" control={<Radio />} label="Student"
                                 onChange={event => setMode(event.target.value)}/>
               <FormControlLabel value="teacher" control={<Radio />} label="Teacher"
                                 onChange={event => setMode(event.target.value)}/>
           </RadioGroup>
        </Box>
    )

    

    return (
        <Box className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            <Box className={classes.body}>
                {account}
                {controller}
            </Box>
        </Box>
    )
}

export default Registration
