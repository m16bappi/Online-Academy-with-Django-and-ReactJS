import React, { Component } from 'react';
import { Image, Carousel } from 'react-bootstrap';
import dark from '../../../../res/dark.jpg';

export default class Banner extends Component {
    constructor() {
        super()

        this.state = {
            index: 0
        }
        this.IntervalID;
    }

    componentDidMount() {
        this.IntervalID = setInterval(()=>{
            if(this.state.index < 2) {
                this.setState({
                    ...this.state,
                    index : this.state.index + 1
                });
            } else {
                this.setState ({
                    ...this.state,
                    index: 0
                })
            }
        }, 5000)
    }

    handleSelect = (selectedIndex, e) => {
        clearInterval(this.IntervalID);
        this.setState({
            ...this.state,
            index: selectedIndex
        })
    };

    render() {
        return (
            <div>
                <Carousel activeIndex={this.state.index} onSelect={(selectedIndex)=>this.handleSelect(selectedIndex)}>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={"/static/bundles/" + dark}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={"/static/bundles/" + dark}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={"/static/bundles/" + dark}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
