import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import NewsHeader from '../../../../../res/news-header.jpg'

export default class News extends Component {
    render() {
        return (
            <div>
                <Image src={"/static/bundles/" + NewsHeader} fluid/>
                <p className="text-muted mt-3" >JUNE 6, 2019 / ADMISSION, UPDATES</p>
                <p className = "mt-0"><a href="#">Campus Camping and Learning Session</a></p>
            </div>
        )
    }
}
