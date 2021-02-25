import React, {useState} from "react";
import {connect} from "react-redux";
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

import {user_register} from "../../store/Actions/Auth/Register";

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
    teacher: {
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

const Registration = (props) => {
    const classes = useStyles()
    const [dept, setDept] = useState('CSE')
    const [select, setSelect] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [file, setFile] = useState()
    const [mode, setMode] = useState('student')
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const [st, setSt] = useState({
        varsity_id: '',
        intake: '',
        section: '',
        phone: '',
        address: ''
    })
    const [th, setTh] = useState({
        phone: '',
        address: ''
    })

    const [error, setError] = useState({
        username: false,
        email: false,
        password1: false,
        password2: false,
        varsity_id: false,
        intake: false,
        section: false,
        phone: false,
        address: false,
        image: false
    })

    const onChangeHandler = (event) => {
        if (activeStep === 0)
        {
            setUser({
                ...user,
                [event.target.name]: event.target.value
            })
        }
        if(activeStep !==0 && mode === 'student')
        {
            setSt({
                ...st,
                [event.target.name]: event.target.value
            })
        }
        if(activeStep !==0 && mode === 'teacher')
        {
            setTh({
                ...th,
                [event.target.name]: event.target.value
            })
        }
        setError({...error, [event.target.name]: false})
    }

    const nextHandler = () =>{
        let flag = 1
        if(activeStep === 0){
            if(!user.username.length){
                setError(prevState => {return {...prevState, username: true}})
                flag = 0
            }
            if(!user.email.length){
                setError(prevState => {return {...prevState, email: true}})
                flag = 0
            }
            if (!user.password.length){
                setError(prevState => {return {...prevState, password1: true}})
                flag = 0
            }
            if (!user.password2.length){
                setError(prevState => {return {...prevState, password2: true}})
                flag = 0
            }
            if (user.password !== user.password2){
                setError(prevState => {return {...prevState, password2: true}})
                flag = 0
            }
        }
        if (activeStep === 1 && mode === 'student'){
            if (!st.varsity_id.length){
                setError(prevState => {return {...prevState, varsity_id: true}})
                flag = 0
            }
            if (!st.intake.length){
                setError(prevState => {return {...prevState, intake: true}})
                flag = 0
            }
            if (!st.section.length){
                setError(prevState => {return {...prevState, section: true}})
                flag = 0
            }
            if (!st.phone.length){
                setError(prevState => {return {...prevState, phone: true}})
                flag = 0
            }
            if (!st.address.length){
                setError(prevState => {return {...prevState, address: true}})
                flag = 0
            }
        } else if (activeStep === 1 && mode === 'teacher'){
            if (!th.phone.length){
                setError(prevState => {return {...prevState, phone: true}})
                flag = 0
            }
            if (!th.address.length){
                setError(prevState => {return {...prevState, address: true}})
                flag = 0
            }
        }
        if (activeStep !== steps.length-1 && flag === 1) {
            setActiveStep(prevActiveStep => prevActiveStep + 1)
        } else if (flag === 1) {
            if (mode === 'student'){
                const data = new FormData()
                data.append('mode', mode)
                data.append('file', file, file.name)
                data.append('username', user.username)
                data.append('email', user.email)
                data.append('password', user.password)
                data.append('varsity_id', st.varsity_id)
                data.append('dept', dept)
                data.append('intake', st.intake)
                data.append('section', st.section)
                data.append('phone', st.phone)
                data.append('address', st.address)
                props.user_register(data)
            }
            else
            {
                const data = new FormData()
                data.append('mode', mode)
                data.append('username', user.username)
                data.append('email', user.email)
                data.append('password', user.password)
                data.append('file', file, file.name)
                data.append('dept', dept)
                data.append('phone', th.phone)
                data.append('address', th.address)
                props.user_register(data)
            }
        }
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
            {activeStep === 0 ? <Button variant="contained" onClick={()=> props.change()}>Login</Button>: null}
            { props.isAuthenticated ? <Button variant="contained" color="secondary" onClick={()=> props.close()}>Close</Button>: null}
        </Box>
    )

    const account = (
        <Box className={classes.account}>
            <TextField variant={"outlined"} color={"primary"} name="username"
                       error={error.username} helperText={error.username ? 'username required' : ' '}
                       value={user.username} autoComplete="off"
                       label={"username"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="email"
                       error={error.email} helperText={error.email ? 'email required' : ' '}
                       value={user.email} autoComplete="off"
                       label={"email"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password"
                       error={error.password1} helperText={error.password1 ? 'password required' : ' '}
                       value={user.password} autoComplete="off"
                       label={"password"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="password2"
                       error={error.password2} helperText={error.password2 ? 'password not match': ' '}
                       value={user.password2} autoComplete="off"
                       label={"password"} onChange={onChangeHandler}/>
           <RadioGroup row value={mode}>
               <FormControlLabel value="student" control={<Radio />} label="Student"
                                 onChange={event => setMode(event.target.value)}/>
               <FormControlLabel value="teacher" control={<Radio />} label="Dashboard"
                                 onChange={event => setMode(event.target.value)}/>
           </RadioGroup>
        </Box>
    )

    const student = (
        <Box className={classes.student}>
            <TextField variant={"outlined"} color={"primary"} name="varsity_id" autoComplete="off"
                       value={st.varsity_id} error={error.varsity_id}
                       helperText={error.varsity_id ? 'required': ' '} label={"Varsity ID"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="intake" autoComplete="off"
                       value={st.intake} error={error.intake}
                       helperText={error.intake?'intake required': ' '} label={"intake"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="section" autoComplete="off"
                       value={st.section} error={error.section}
                       helperText={error.section? 'section required': ' '} label={"section"} onChange={onChangeHandler}/>
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
                       value={st.phone} error={error.phone}
                       helperText={error.phone?'number required': ' '} label={"Phone Number"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="address" autoComplete="off"
                       value={st.address} error={error.address}
                       helperText={error.address?'address required':' '} label={"Address"} onChange={onChangeHandler}/>
        </Box>
    )

    const teacher = (
        <Box className={classes.teacher}>
            <FormControl>
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
                <FormHelperText>{' '}</FormHelperText>
            </FormControl>
            <TextField variant={"outlined"} color={"primary"} name="phone" autoComplete="off"
                       value={th.phone} error={error.phone}
                       helperText={error.phone?'number required':' '} label={"phone"} onChange={onChangeHandler}/>
            <TextField variant={"outlined"} color={"primary"} name="address" autoComplete="off"
                       value={th.address} error={error.address}
                       helperText={error.address?'address required':' '} label={"Address"} onChange={onChangeHandler}/>
        </Box>
    )

    const image = (
        <Box className={classes.image}>
             <Input type="file" onChange={event => setFile(event.target.files[0])}
              disableUnderline
             />
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
                {activeStep === 0 ? account : activeStep === 1 ? mode === 'student' ? student : teacher : activeStep === 2 ?
                    image : null}
                {controller}
            </Box>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {user_register})(Registration)
