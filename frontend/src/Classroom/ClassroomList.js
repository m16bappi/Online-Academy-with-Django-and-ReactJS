import React, {useState} from "react";
import {connect} from "react-redux";
import {Box, Collapse, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles(theme=>({
    subList: {
        paddingLeft: theme.spacing(3)
    }
}))

const intakeList = ['34', '35', '36', '37']

const ClassroomList = () => {
    const classes = useStyles()
    const [item, setItem] = useState({})

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

export default connect(mapStateToProps)(ClassroomList)
