import React, { Component } from 'react';
import './Note.css';
import moment from 'moment';
class Note extends Component {
   
    render() {
        const { note, id, remove ,edit } = this.props;
        return(
            <div className="well">
                <div className="tools">
                    <spam className="glyphicon glyphicon-remove" aria-hidden="true" onClick={remove.bind(this,id)}></spam>
                    <spam onClick={()=> edit(id,note)} className="glyphicon glyphicon-pencil" aria-hidden="true"></spam>
                </div>
                <p><strong>Title:</strong> { note.title }</p>
                <p><strong>Message:</strong> { note.body }</p>
                <p><strong>Create Date:</strong> { moment(note.date).format('DD/MM/YYYY h:MM:ss') }</p>
                <p><strong>Event Date:</strong> { moment(note.date_event).format('DD/MM/YYYY h:MM:ss') }</p>
            </div> 
        )
    }
}
export default Note;