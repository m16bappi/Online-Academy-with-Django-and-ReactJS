import React, { Component } from 'react'
import Banner from '../Banner/Banner'
import NewsUpdatesAndVideos from '../NewsUpdateAndVideos/NewsUpdatesAndVideos'
import Programs from '../Proprams/Programs'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Programs />
                <NewsUpdatesAndVideos />
            </div>
        )
    }
}
