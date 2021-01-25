import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {Box, Collapse, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@material-ui/icons';

import {GET_INTAKE} from "../../store/Actions/Program/Program";
import {GET_CLASSROOMS} from "../../store/Actions/Classroom/Classroom"

const useStyles = makeStyles(theme=>({
    subList: {
        paddingLeft: theme.spacing(3)
    }
}))

const ClassroomList = (props) => {
    const classes = useStyles()
    const [item, setItem] = useState({})
    const params = useParams()

    useEffect(() => {
        props.GET_INTAKE(params.name)
    }, [])

    const intakeClickHandler = (intakeItem, program, intake) => {
        props.GET_CLASSROOMS(program, intake)
        setItem({[intakeItem.id]: !item[intakeItem.id]})
    }

    return(
        <Container>
            <List>
                {props.intake.map((intakeItem, intakeIndex) =>(
                    <Box key={intakeIndex}>
                        <ListItem button divider onClick={()=>intakeClickHandler(intakeItem, params.name, intakeItem.intake_name)}>
                            <ListItemText primary={`${intakeItem.intake_name} Intake`}/>
                            <ListItemIcon>
                                {item[intakeItem.id] ? <ExpandLess/>:<ExpandMore/>}
                            </ListItemIcon>
                        </ListItem>
                        <Collapse in={item[intakeItem.id]}>
                            {props.classroom.map((classroomItem, classroomIndex) => (
                                <List className={classes.subList} key={classroomIndex}>
                                <ListItem button>
                                    <ListItemText primary={classroomItem.class_name}/>
                                </ListItem>
                            </List>
                            ))}
                        </Collapse>
                    </Box>
                ))}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        intake: state.Program.intake,
        classroom: state.Classroom.classroom
    }
}

export default connect(mapStateToProps, {GET_INTAKE, GET_CLASSROOMS})(ClassroomList)
