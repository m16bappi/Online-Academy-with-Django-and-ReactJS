import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {Box, Button, CardMedia, Container, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";
import {GET_CLASSROOM} from "../../../store/Actions/Classroom/Classroom";
import {get_stream, get_stream_comment} from "../../../store/Actions/Classroom/Classroom";
import VideocamIcon from '@material-ui/icons/Videocam';

import Stream from "./Stream/Stream";
import People from "./People/People";
import Classworks from "./Classworks/Classworks";
import header from "../classroomImages/img2.jpg";

const useStyles = makeStyles(theme=> ({
    header: {
        height: "25rem",
        marginTop: theme.spacing(2),
        borderRadius: "10px",
        boxShadow: theme.shadows[2]
    },
    headerImage: {
        height: "20rem",
        position: "relative"
    },
    headerContent: {
        position: "absolute",
        top: "12rem",
        left: "50%",
        transform: "translate(-50%, -50%)",
        '& h4': {
            fontFamily: "Oswald, sans-serif",
            fontWeight: 800,
            color: "white"
        }
    },
    headerActionContent: {
        height: "5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        '& h6': {
            fontFamily: "Playfair Display, serif",
            fontWeight: "600"
        }
    },
    body: {
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing(2),
        marginTop: theme.spacing(5)
    },
    bodyTabs: {
        width: "20%",
        height: "9rem",
        boxShadow: theme.shadows[2],
        borderRadius: "5px"
    },
    bodyContents: {
        width: "80%"
    },
    tabItem: {
        fontFamily: "Playfair Display, serif",
        fontWeight: 600,
        color: "black"
    }
}))

const Classroom = (props) => {
    const classes = useStyles()
    const params = useParams()
    const [tab, setTab] = useState(0)

    useEffect(()=>{
        props.GET_CLASSROOM(params.id)
        props.get_stream(params.id)
        props.get_stream_comment(params.id)
    }, [])

    return (
        <Container>
            <Box className={classes.header}>
                <CardMedia image={"/static/bundles/"+header} className={classes.headerImage}/>
                <Box className={classes.headerContent}>
                    <Typography variant="h4">{props.classroom.class_name}</Typography>
                </Box>
                <Box className={classes.headerActionContent}>
                    <Typography variant="h6">class code: {props.classroom["class_code"]}</Typography>
                    <Button endIcon={<VideocamIcon/>} variant="outlined" color="primary">LIVE</Button>
                </Box>
            </Box>

            <Box className={classes.body}>
                <Box className={classes.bodyTabs}>
                    <Tabs orientation="vertical" textColor="secondary" indicatorColor="secondary"
                          onChange={(event, value) => setTab(value)} value={tab}
                    >
                        <Tab label="stream" className={classes.tabItem}/>
                        <Tab label="Classwork" className={classes.tabItem}/>
                        <Tab label="People" className={classes.tabItem}/>
                    </Tabs>
                </Box>
                <Box className={classes.bodyContents}>
                    {tab === 0 ? <Stream classroom={props.classroom}/>: tab === 1? <Classworks/>: <People/>}
                </Box>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        classroom: state.Classroom.classroom
    }
}

export default connect(mapStateToProps, {GET_CLASSROOM, get_stream, get_stream_comment})(Classroom)
