import React, { Component } from 'react';
import $ from 'jquery'
import moment from 'moment'
import firebase from 'firebase';
import 'fullcalendar/dist/fullcalendar.css';
import './Calendar.css'
import fullCalendar from 'fullcalendar'

class Calendar extends Component {
    state = { tasks:[]}

    convertToArray(snapshot){
        const newTasks=[]
        const styleWithFinish={ backgroundColor:'red',borderColor:'white',textColor:'white' }
        Object.keys(snapshot).forEach((key)=> {

            let data={id:key, ...snapshot[key]}
            // cuando los eventos han pasado ya , estilo rojo
            if(moment(snapshot[key].start).isBefore(moment())){
                data= { ...data, ...styleWithFinish}
            }
            newTasks.push(data)
        });
        return newTasks;
    }

    componentDidMount(){

        $("#calendar").fullCalendar({
            events:this.convertToArray(this.state.tasks),
            customButtons: {
                myCustomButton: {
                    text: 'Nueva tarea',
                    click: function() {
                        alert('clicked the custom button!');
                    }
                }
            },
			header: {
				left: 'prev,next today myCustomButton',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
            },
            eventClick: (calEvent, jsEvent, view) =>{
                this.props.showDetails(this.state.tasks[calEvent.id]);
            },
            dayClick:(date, jsEvent, view, resourceObj)=>{
                         
            }
        });
        
        
    }

    componentWillUpdate(nextProps, nextState) {
            
        $('#calendar').fullCalendar( "removeEvents" );
        $("#calendar").fullCalendar( "addEventSource", this.convertToArray(nextState.tasks));
    }

    componentWillMount() {

        firebase.database().ref('/tasks').on('value',(snapshot)=>{
            this.setState({tasks:snapshot.val()})
                        
        })
    }
    componentWillUnmount() {
        firebase.database().ref('/tasks').off();
    }

    render() {
        return (
            <div id="calendar"></div>
        );
    }
}

export default Calendar
;