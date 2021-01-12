import React, { Component } from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import videos from '../../../../../res/videos.jpg';

export default class Videos extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Image src={"/static/bundles/" + videos} fluid/>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Image src={"/static/bundles/" + videos} fluid/>
                    </Col>
                </Row>
            </div>
        )
    }
}
