import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {Box, Collapse, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@material-ui/icons';

import {GET_INTAKE} from "../../store/Actions/Program/Program";

const useStyles = makeStyles(theme=>({
    subList: {
        paddingLeft: theme.spacing(3)
    }
}))

const intakeList = ['34', '35', '36', '37']

const ClassroomList = (props) => {
    const classes = useStyles()
    const [item, setItem] = useState({})
    const params = useParams()

    useEffect(() => {
        props.GET_INTAKE(params.name)
    }, [])

    return(
        <Container>
            <List>
                {intakeList.map((value, index) =>(
                    <Box  key={index}>
                        <ListItem button divider onClick={()=>setItem({[value]: !item[value]})}>
                            <ListItemText primary={`${value} Intake`}/>
                            <ListItemIcon>
                                {item[value] ? <ExpandLess/>:<ExpandMore/>}
                            </ListItemIcon>
                        </ListItem>
                        <Collapse in={item[value]}>
                            <List className={classes.subList}>
                                <ListItem button>
                                    <ListItemText primary="cse-111"/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        intake: state.Program
    }
}

export default connect(mapStateToProps, {GET_INTAKE})(ClassroomList)
