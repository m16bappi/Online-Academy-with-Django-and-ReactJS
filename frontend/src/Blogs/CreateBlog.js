import React, {useState} from "react";
import {connect} from "react-redux";
import {Box, Button, Input, makeStyles, TextField, Typography} from "@material-ui/core";

import {ADD_BLOGS} from "../../store/Actions/Blogs/Blogs";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles({
    root: {
        height: "35rem",
        width: "25rem",
        paddingTop: "3rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "5px",
        background: "white",
    }
})

const CreateBlog = (props) => {
    const classes = useStyles()
    const [form, setForm] = useState({
        title: '', body: '', file: undefined, category: ''
    })

    const submitHandler = () => {
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('blog', form.body)
        formData.append('category', form.category)
        if (form.file !== undefined) {
            formData.append('cover', form.file, form.file.name)
        }
        props.ADD_BLOGS(formData)
        props.onClose()
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h5">Create Blog Post</Typography>
            <TextField label="title" variant="outlined" color="primary" fullWidth
                       onChange={event => setForm({...form, title: event.target.value})}/>
            <TextField label="Blog body" variant="outlined" color="primary" multiline rows={6} rowsMax={9} fullWidth
                       onChange={event => setForm({...form, body: event.target.value})}/>
            <Input type="file" disableUnderline color="primary" fullWidth
                   onChange={event => setForm({...form, file: event.target.files[0]})}/>
            <Autocomplete fullWidth
                onChange={(event, value) => {
                    setForm({...form, category: value ? value["program_title"] : ''})
                }}
                options={props.program ? props.program : null}
                getOptionLabel={(option) => option["program_title"]}
                renderInput={(params) => <TextField {...params} name="program" label="Program" variant="outlined"/>}
            />
            <Button variant="contained" color="primary" fullWidth onClick={submitHandler}>Post</Button>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        program: state.Program.program
    }
}

export default connect(mapStateToProps, {ADD_BLOGS})(CreateBlog)
