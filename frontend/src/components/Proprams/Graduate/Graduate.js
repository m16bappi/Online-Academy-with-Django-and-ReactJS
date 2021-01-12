import React, { Component } from 'react'
import Child from './GraduateChild/Child'

export default class Graduate extends Component {
    render() {
        return (
            <div>
                <div>
                    <p className="mt-3 display-4">
                        Graduate Programs
                    </p>
                    <div className="d-flex justify-content-sm-around flex-wrap">
                        <Child />
                        <Child />
                        <Child />
                        <Child />
                    </div>
                </div>
            </div>
        )
    }
}
