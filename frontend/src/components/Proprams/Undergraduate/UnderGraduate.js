import React, { Component } from 'react';
import Child from './UndergraduateChild/Child'

export default class UnderGraduate extends Component {
    render() {
        return (
            <div>
                <p className="display-4">
                    Undergraduate Programs
                </p>
                <div className='mt-5 d-flex justify-content-sm-around flex-wrap'>
                    <Child />
                    <Child />
                    <Child />
                    <Child />
                </div>
            </div>
        )
    }
}
