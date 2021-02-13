import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    makeStyles,
    TextField,
    Typography,
    ListItem,
    ListItemAvatar, ListItemText, List, Input, IconButton
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

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
        //color: "black",
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

    const inputHandler = () => {
        setInput(false)
        setTextarea('')
    }

    const inputButton = (
        <Box className={classes.inputButton} onClick={()=>setInput(true)}>
            <Avatar>M</Avatar>
            <Typography component={'p'}>Announce something on your class</Typography>
        </Box>)

    const inputField = (
        <Box className={classes.inputField}>
            <TextField multiline rows={3} rowsMax={5} label="Announce something on your class"
                name="textarea" onChange={event => setTextarea(event.target.value)}
            />
            <Box>
                <Button variant="text" onClick={inputHandler}>Cancel</Button>
                <Button variant="contained" color="primary" disabled={!textarea.length}>post</Button>
            </Box>
        </Box>)

    return(
        <Box className={classes.root}>
            <Box className={classes.input}>
                {input ? inputField:inputButton}
            </Box>
            <Box className={classes.post}>
                <ListItem disableGutters className={classes.postHeader}>
                    <ListItemAvatar><Avatar>M</Avatar></ListItemAvatar>
                    <ListItemText primary="Mehedi Hasan" secondary="16,12,1995"/>
                </ListItem>
                <Typography className={classes.postBody}>When Denise Edwards (not her real name) saw a text on her 11-year-old son’s phone that said, “Im gonna kill you 2mrw”
                    from an unrecognized number, her heart stopped. She asked her son about it and was shocked to hear an older boy on
                    his bus had been sending these types of texts for about two months.
                    Experts estimate that teens are at least four times more likely to say something hurtful or demeaning to another child
                    when behind the veil of a phone or computer.
                </Typography>
                <Box className={classes.postFooter}>
                    <Typography>Comments</Typography>
                    <Box className={classes.postFooterInput}>
                        <Avatar>M</Avatar>
                        <TextField fullWidth variant="outlined"/>
                        <IconButton><SendIcon /></IconButton>
                    </Box>
                    <List disablePadding>
                        <ListItem alignItems={"flex-start"} disableGutters>
                            <ListItemAvatar><Avatar>A</Avatar></ListItemAvatar>
                            <ListItemText primary="Mehedi Hasan" secondary={
                                <Typography>
                                    Ali Connors — I'll be in your neighborhood doing errands this…
                                </Typography>
                            }/>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default Stream
