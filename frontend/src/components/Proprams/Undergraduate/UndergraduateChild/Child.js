import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import course from '../../../../../../res/bubt-course.png'

export default class Child extends Component {
    render() {
        return (
            <div className = "shadow mb-5 rounded mx-2">
                <Card style={{ width: "20rem" }}>
                    <Card.Img src={"/static/bundles/" + course} />
                    <Card.Body>
                        <Card.Title>
                            this is card Title
                        </Card.Title>
                        <Card.Text>
                            this is card text
                        </Card.Text>
                        <Button variant="primary">submit</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
