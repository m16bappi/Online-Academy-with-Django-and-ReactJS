import React, {useState} from "react";
import {Box, Collapse, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {useParams} from 'react-router-dom';
import {ExpandLess, ExpandMore} from '@material-ui/icons'

const useStyles = makeStyles(theme=>({
    root: {},
    active: {
        backgroundColor: "red"
    }
}))

const intakeList = ['34', '35', '36', '37']

const ClassroomList = () => {
    const params = useParams()
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
                            <List>
                                <ListItem>
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

export default ClassroomList
