import React from "react";
import {Box, Modal, Backdrop, makeStyles, Fade} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme=> ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "75%",
        height: "75vh",
        background: "white"
    }
}))

const Exam = (props) => {
    const classes = useStyles()
    const params = useParams().className
    return(
        <Modal open={props.open}
            className={classes.root}
               closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}
        >
            <Fade in={props.open}>
                <Box className={classes.container}>
                    Exam stated
                </Box>
            </Fade>
        </Modal>
    )
}

export default Exam
