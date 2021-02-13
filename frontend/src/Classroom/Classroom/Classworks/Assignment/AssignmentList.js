import React, {useState} from "react";
import {connect} from "react-redux";
import {Box, Divider, makeStyles, Typography} from "@material-ui/core";
import Countdown from "react-countdown";

import Assignment from "./Assignment";

const useStyles = makeStyles(theme=>({
    listItemRoot: {
        borderRadius: '5px',
        '&:hover': {
            boxShadow: theme.shadows[3],
            transition: "0.3s"
        }
    },
    listItem: {
        height: "3rem",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        '&:hover': {
            background: "#E8F0FE",
            transition: "0.3s",
            cursor: "pointer"
        }
    }
}))

const AssignmentList = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(false)
    const [state, setState] = useState()
    const onClickHandler = (item) => {
        setState(item)
        setValue(true)
    }

    return(
        <Box>
            <Typography variant="h4">Assignments</Typography>
                <Divider />
                <br/>
                {props.assignments.map((item, index)=> (
                    <Box className={classes.listItem} key={index} onClick={item.status ? ()=>onClickHandler(item):null}>
                        <Typography variant="h6">{item.title}</Typography>
                        {item.status ?
                            <Typography>{new Date(item["submission_time"]).toLocaleString().split('T')[0]}</Typography>
                                :
                            <Typography>Time over</Typography>
                        }
                    </Box>
                ))}
                {value ? <Assignment open={value} onclose={()=>setValue(false)} item={state} username={props.username}/>:null}
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        assignments: state.Classroom.assignments,
        username: state.Auth.user.username
    }
}

export default connect(mapStateToProps)(AssignmentList)
