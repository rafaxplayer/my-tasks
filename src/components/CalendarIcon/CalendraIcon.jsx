import React, { Component } from 'react';
import './CalendarIcon.css'
import moment from 'moment'
class CalendarIcon extends Component {
    constructor(props){
        super(props)
        this.state = { date:moment() }
        this.timer=null;
    }
    

    componentWillMount() {
        this.timer = setInterval(()=>{ this.setState({date:moment()})},1000)
    }
    componentWillUnmount() {
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    render() {
        const { date }= this.state
        return (
            <div className="date-time">
                <span>{date.format('dddd')}</span>
                <div className="date-clock">
                    <strong>{date.format('DD')}</strong>
                    <p>{date.format('hh:mm:ss')}</p>
                </div>
                
                <span>{date.format('MMMM')}</span>
                
            
            </div>

        );
    }
}

export default CalendarIcon;    