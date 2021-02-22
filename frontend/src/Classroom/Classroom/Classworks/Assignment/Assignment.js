import React, {useState} from "react";
import {connect} from "react-redux";
import {Backdrop, Box, Modal, Fade, makeStyles, Typography, Button, Input, FormControl} from "@material-ui/core";

import {post_assignment_answer} from "../../../../../store/Actions/Classroom/Classroom";

const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "35rem",
        minHeight: "35rem",
        background: "white",
        margin: theme.spacing(5)
    },
    containerHeader: {
        background: "#E8F0FE",
        height: "5rem",
        borderBottom: "2px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '& h4': {
            fontFamily: "Playfair Display, serif",
            fontWeight: 600
        }
    },
    containerBody: {
        height: "25rem",
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        '& p': {
            fontFamily: "Poppins,sans-serif",
            fontWeight: "600"
        }
    },
    containerFooter: {
        height: "5rem",
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        '& div': {
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1)
        }
    }
}))

const Assignment = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(false)
    const [file, setFile] = useState()

    const onsubmitHandler = () => {
        const data = new FormData()
        data.append('id', props.item.id)
        data.append('file', file, file.name)
        props.post_assignment_answer(data)
        console.log(data)
        setValue(true)
    }

    return(
        <Modal open={props.open} className={classes.root}
               closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}
        >
            <Fade in={props.open}>
                <Box className={classes.container}>
                    <Box className={classes.containerHeader}>
                        <Typography variant="h4">{props.item.title}</Typography>
                    </Box>
                    <Box className={classes.containerBody}>
                        <Box component="p">
                            {props.item.body}
                        </Box>
                    </Box>

                    {props.item.submitted.includes(props.username)?
                        <Box className={classes.containerFooter}>
                            <Typography variant="h6">Submitted</Typography>
                            <Button onClick={()=>props.onclose()} variant="contained" color="secondary">close</Button>
                        </Box>
                            :
                        <Box className={classes.containerFooter}>
                                <FormControl required>
                                    <Input type="file" disabled={value} onChange={event => setFile(event.target.files[0])}
                                    disableUnderline
                                    />
                                </FormControl>
                                <Box component="div">
                                    <Button onClick={onsubmitHandler} variant="contained" color="primary" disabled={value}>submit</Button>
                                    <Button onClick={()=>props.onclose()} variant="contained" color="secondary">close</Button>
                                </Box>
                        </Box>
                    }
                </Box>
            </Fade>
        </Modal>
    )
}

export default connect(null, {post_assignment_answer})(Assignment)
