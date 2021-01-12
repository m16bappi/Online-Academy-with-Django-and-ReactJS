import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import News from './NewsAndUpdates/News'
import Updates from './NewsAndUpdates/Updates'
import Videos from './Videos/Videos'

export default class NewsUpdatesAndVideos extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={9}>
                        <h3 className="font-weight-normal">News & Updates</h3>
                        <p><a href="#">Read All News</a></p>
                        <Row>
                            <Col sm={6}>
                                <News />
                            </Col>
                            <Col sm={6}>
                                <Updates />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <h3 className="font-weight-normal">Campus Videos</h3>
                        <p><a href="#">View All Videos</a></p>
                        <Videos />
                    </Col>
                </Row>
            </div>
        )
    }
}
