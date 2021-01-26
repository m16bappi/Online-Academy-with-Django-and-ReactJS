import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {Box, Button, CardMedia, Container, makeStyles, Tab, Tabs, Typography, useTheme,} from "@material-ui/core";
import {GET_CLASSROOM} from "../../../store/Actions/Classroom/Classroom";
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';

import Stream from "./Stream/Stream";
import People from "./People/People";
import header from "../../../../res/my_classroom_header/inside_classroom_header.jpg";

const useStyles = makeStyles(theme=> ({
    header: {
        height: "25rem",
        marginTop: theme.spacing(2),
        borderRadius: "10px",
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[5]
        }
    },
    headerImage: {
        height: "20rem",
        position: "relative",
        borderBottom: "5px solid tomato"
    },
    headerContent: {
        position: "absolute",
        top: "12rem",
        left: "50%",
        transform: "translate(-50%, -50%)",
        '& h4': {
            fontFamily: "Oswald, sans-serif",
            fontWeight: 800
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
        marginTop: theme.spacing(5)
    },
    bodyTabs: {
        width: "20%",
        height: "9rem",
        boxShadow: theme.shadows[2],
        borderRadius: "5px"
    },
    bodyContents: {
        width: "80%",
        height: "30rem",
        background: "gray",
        marginLeft: theme.spacing(1)
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
    const theme = useTheme()
    const [tab, setTab] = useState(0)

    useEffect(()=>{
        props.GET_CLASSROOM(params.className)
    }, [])

    return (
        <Container>
            <Box className={classes.header}>
                <CardMedia image={"/static/bundles/"+header} className={classes.headerImage}/>
                <Box className={classes.headerContent}>
                    <Typography variant="h4">{params.className}</Typography>
                </Box>
                <Box className={classes.headerActionContent}>
                    <Typography variant="h6">class code: 123</Typography>
                    <Button endIcon={<SwitchVideoIcon/>} variant="contained" color="secondary">GO LIVE</Button>
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
                    {tab === 0 ? <Stream />: tab === 1? null: <People/>}
                </Box>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => {
    return{
        classroom: state.Classroom.classroom
    }
}

export default connect(mapStateToProps, {GET_CLASSROOM})(Classroom)
