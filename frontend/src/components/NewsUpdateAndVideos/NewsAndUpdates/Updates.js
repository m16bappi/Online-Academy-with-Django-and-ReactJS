import React, { Component } from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import news1 from '../../../../../res/news_list_1.jpg'
import news2 from '../../../../../res/news_list_2.jpg'


export default class Updates extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={4}>
                        <Image src={"/static/bundles/" + news1} thumbnail />
                    </Col>
                    <Col sm={8}>
                        <p className="text-muted" >JUNE 6, 2019 / ADMISSION, UPDATES</p>
                        <p className="mt-0"><a href="#">Campus Camping and Learning Session</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Image src={"/static/bundles/" + news2} thumbnail />
                    </Col>
                    <Col sm={8}>
                        <p className="text-muted" >JUNE 6, 2019 / ADMISSION, UPDATES</p>
                        <p className="mt-0"><a href="#">Campus Camping and Learning Session</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Image src={"/static/bundles/" + news1} thumbnail />
                    </Col>
                    <Col sm={8}>
                        <p className="text-muted" >JUNE 6, 2019 / ADMISSION, UPDATES</p>
                        <p className="mt-0"><a href="#">Campus Camping and Learning Session</a></p>
                    </Col>
                </Row>
            </div>
        )
    }
}
