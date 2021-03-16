import React, {useState} from "react";
import {
    Box,
    Button,
    Divider,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Avatar,
    ListItemAvatar, ListItemSecondaryAction, Typography, Modal
} from "@material-ui/core";
import {connect} from "react-redux";
import CreateBlog from "./CreateBlog";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        '& h5': {
            fontFamily: "Playfair Display, serif",
            fontWeight: "600",
            borderBottom: "2px solid black"
        }
    },
    post: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

const list = ['CSE', 'BBA', 'EEE', 'ENGLISH', 'ECONOMICS']

const Filter = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    return (
        <Box className={classes.root}>
            {props.isAuthenticated ?
                <Box>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(true)}>Create
                        Blog</Button>
                    <Divider/>
                </Box> : <Typography variant="h5">Filter</Typography>
            }
            <List>
                {list.map((item, index) => (
                    <ListItem button divider={true} key={index}>
                        <ListItemAvatar><Avatar>{item.charAt(0)}</Avatar></ListItemAvatar>
                        <ListItemText primary={item}/>
                        <ListItemSecondaryAction>
                            <ListItemText primary={5}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            {open ? <Modal open={open} onClose={()=>setOpen(false)} className={classes.post}>
                <div style={{outline: "none"}}>
                    <CreateBlog onClose={()=>setOpen(false)}/>
                </div>
            </Modal>: null}
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Filter)
