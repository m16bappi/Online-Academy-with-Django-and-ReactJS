import React, { Component } from 'react'
import UnderGraduate from './Undergraduate/UnderGraduate'
import Graduate from './Graduate/Graduate'

export default class Programs extends Component {
    render() {
        return (
            <div className = "container">
                <p className = "display-1 text-center">
                    Programs
                </p>
                <hr />
                <UnderGraduate />
                <Graduate />
            </div>
        )
    }
}
