import React, { Component } from 'react';
import $ from 'jquery'
import 'fullcalendar/dist/fullcalendar.css';
import './Calendar.css'
import fullCalendar from 'fullcalendar'
class Calendar extends Component {
    state = {  }

    componentDidMount(){
        $("#calendar").fullCalendar({
            events:this.props.tasks,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			eventClick: (calEvent, jsEvent, view) =>{
                
            },
            dayClick:(date, jsEvent, view, resourceObj)=>{
                         
            }
        });
    }

    render() {
        return (
            <div id="calendar"></div>
        );
    }
}

export default Calendar
;