import React, {useState} from "react";
import {
    Box,
    makeStyles,
    Stepper,
    RadioGroup,
    Step,
    StepLabel,
    TextField,
    Button, Select, MenuItem,
    FormControlLabel, Radio, Input, FormControl, FormHelperText
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: "30rem",
        height: "42rem",
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
    },
    student: {
        display: "flex",
        flexDirection: "column"
    },
    image: {
        marginTop: "2rem",
        marginBottom: "2rem"
    }

}))

const steps = ['Account', 'Personal', 'Picture']
const department = ['CSE', 'EEE', 'BBA', 'LL.B', 'TEXTILE', 'ENGLISH', 'ECONOMICS']

const Registration = () => {
    const formData = new FormData()
    const classes = useStyles()
    const [dept, setDept] = useState('CSE')
    const [select, setSelect] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [user, setUser] = useState({
        'username': '',
        'email': '',
        'password1': '',
        'password2': ''
    })
    const [file, setFile] = useState()
    const [mode, setMode] = useState('student')
    const [st, setSt] = useState({
        'varsity_id': '',
        'intake': '',
        'section': '',
        'dept': '',
        'phone': '',
        'address': ''
    })
    const [th, setTh] = useState({
        'dept': '',
        'phone': '',
        'address': ''
    })

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
        console.log(st)
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
                       helperText={' '} value={user.username} autoComplete="off"
                       label={"username"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="email"
                       helperText={' '} value={user.email} autoComplete="off"
                       label={"email"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password"
                       helperText={' '} value={user.password1} autoComplete="off"
                       label={"password"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password"
                       helperText={' '} value={user.password2} autoComplete="off"
                       label={"password"} onChange={onChangeHandler}/>
           <RadioGroup row value={mode}>
               <FormControlLabel value="student" control={<Radio />} label="Student"
                                 onChange={event => setMode(event.target.value)}/>
               <FormControlLabel value="teacher" control={<Radio />} label="Teacher"
                                 onChange={event => setMode(event.target.value)}/>
           </RadioGroup>
        </Box>
    )

    const student = (
        <Box className={classes.student}>
            <TextField variant={"outlined"} color={"primary"} name="varsity_id" autoComplete="off"
                       value={st.varsity_id}
                       helperText={' '} label={"Varsity ID"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="intake" autoComplete="off"
                       value={st.intake}
                       helperText={' '} label={"intake"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="section" autoComplete="off"
                       value={st.section}
                       helperText={' '} label={"section"} onChange={onChangeHandler}/>
           <FormControl>
               <Select
                    value={dept}
                    onChange={event => setDept(event.target.value)}
                    open={select}
                    onOpen={()=>setSelect(true)}
                    onClose={()=>setSelect(false)}
                    variant={"outlined"}
                >
                    {department.map((value, index) => (
                        <MenuItem value={value} key={index}>{value}</MenuItem>
                    ))}
                </Select>
               <FormHelperText>{' '}</FormHelperText>
           </FormControl>
            <TextField variant={"outlined"} color={"primary"} name="phone" autoComplete="off"
                       value={st.phone}
                       helperText={' '} label={"Phone Number"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="address" autoComplete="off"
                       value={st.address}
                       helperText={' '} label={"Address"} onChange={onChangeHandler}/>
        </Box>
    )

    const teacher = (
        <Box>
            <Select
                value={dept}
                onChange={event => setDept(event.target.value)}
                open={select}
                onOpen={()=>setSelect(true)}
                onClose={()=>setSelect(false)}
            >
                {department.map((value, index) => (
                    <MenuItem value={value} key={index}>{value}</MenuItem>
                ))}
            </Select>
        </Box>
    )

    const image = (
        <Box className={classes.image}>
             <Input type="file" onChange={event => setFile(event.target.files[0])}/>
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
                {activeStep === 0 ? account : activeStep === 1 ? mode === 'student' ? student : teacher : activeStep === 2 ? image : null}
                {controller}
            </Box>
        </Box>
    )
}

export default Registration
