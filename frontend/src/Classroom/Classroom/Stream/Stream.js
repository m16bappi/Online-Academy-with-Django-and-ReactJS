import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    makeStyles,
    TextField,
    Typography,
    ListItem,
    ListItemAvatar, ListItemText, List, IconButton
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {connect} from "react-redux";
import {post_stream, post_stream_comment} from "../../../../store/Actions/Classroom/Classroom";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
    },
    input: {
        boxShadow: theme.shadows[2],
        width: "100%",
        height: "auto",
        transition: "height, 0.5s",
        borderRadius: "5px"
    },
    inputButton: {
        display:"flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        userSelect: "none",
        msUserSelect: "none",
        '&:hover': {
            color: "#3367D5",
            cursor: "pointer"
        }
    },
    inputField:{
        display: "flex",
        gap: theme.spacing(2),
        flexDirection: "column",
        padding: theme.spacing(2)
    },
    post: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: theme.spacing(2),
        borderRadius: "5px",
        boxShadow: theme.shadows[2]
    },
    postHeader: {
        width: "100%"
    },
    postBody: {
        //fontFamily: "Poppins,sans-serif",
        fontWeight: "400",
        width: "100%",
        //color: "dark",
        textAlign: "justify",
        paddingBottom: theme.spacing(2),
        borderBottom: "1px solid grey"
    },
    postFooter: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    postFooterInput: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(2),
        '& fieldset': {
            borderRadius: "20px"
        }
    }
}))

const Stream = (props) => {
    const classes = useStyles()
    const [input, setInput] = useState(false)
    const [textarea, setTextarea] = useState('')
    const [comment, setComment] = useState({
        id: null,
        comment: ''
    })

    const inputHandler = () => {
        setInput(false)
        setTextarea('')
    }

    const post_stream_handler = () => {
        props.post_stream(textarea, props.id)
        setTextarea('')
    }

    const post_comment_handler = () => {
        props.post_stream_comment(comment)
        setComment({comment: ''})
    }

    const inputButton = (
        <Box className={classes.inputButton} onClick={()=>setInput(true)}>
            <Avatar>{props.username ? props.username.charAt(0):null}</Avatar>
            <Typography component={'p'}>Announce something on your class</Typography>
        </Box>)

    const inputField = (
        <Box className={classes.inputField}>
            <TextField multiline rows={3} rowsMax={5} label="Announce something on your class"
                       value={textarea}
                name="textarea" onChange={event => setTextarea(event.target.value)}
            />
            <Box>
                <Button variant="text" onClick={inputHandler}>Cancel</Button>
                <Button variant="contained" color="primary" disabled={!textarea.length}
                        onClick={post_stream_handler}>post</Button>
            </Box>
        </Box>)

    return(
        <Box className={classes.root}>
            <Box className={classes.input}>
                {input ? inputField:inputButton}
            </Box>
            {props.stream.map((item, index)=>(
                <Box className={classes.post} key={index}>
                    <ListItem disableGutters className={classes.postHeader}>
                        <ListItemAvatar><Avatar>{item ? item.user.charAt(0):null}</Avatar></ListItemAvatar>
                        <ListItemText primary={item.user} secondary={item.created}/>
                    </ListItem>
                    <Typography className={classes.postBody}>{item.body}</Typography>
                    <Box className={classes.postFooter}>
                        <Typography>Comments</Typography>
                        <Box className={classes.postFooterInput}>
                            <Avatar>{props.username ? props.username.charAt(0):null}</Avatar>
                            <TextField fullWidth variant="outlined" value={comment.id === item.id ? comment.comment : ''}
                                       onChange={event => setComment({comment: event.target.value, id: item.id}) }/>
                            <IconButton onClick={post_comment_handler}><SendIcon /></IconButton>
                        </Box>
                        <List disablePadding>
                        {props.comment.filter(value => value.stream === item.id).map((value, key)=>(
                            <ListItem alignItems={"flex-start"} disableGutters key={key}>
                                <ListItemAvatar><Avatar>{value ? value.user.charAt(0):null}</Avatar></ListItemAvatar>
                                <ListItemText primary={value.user} secondary={
                                    <Typography>
                                        {value.comment}
                                    </Typography>
                                }/>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.Auth.user.username,
        stream: state.Classroom.stream.streams,
        comment: state.Classroom.stream.comments
    }
}

export default connect(mapStateToProps, {post_stream, post_stream_comment})(Stream)
