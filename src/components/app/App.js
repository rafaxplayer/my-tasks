import React, { Component } from 'react';
import logo from '../../Calender.png';
import './App.css';
import ListNotes from './ListNotes/ListNotes';
import firebase from 'firebase';
import ModalDialogs, { initialstate } from '../ModalDialogs/ModalDialog';
import ButtonUp from '../ButtonUp/ButtonUp';
import ScrollToTop  from 'react-scroll-up';
import moment from 'moment';
import DateTimePicker from 'react-datetimepicker-bootstrap';
import $ from 'jquery'
/*'DD/MM/YYYY h:MM:ss'*/
class App extends Component {

    state = {
        title: "",
        body: "",
        key: "",
        dateevent:null,
        edit: false,
        initialstate
    }
    componentDidMount(){
        window.addEventListener('scroll',console.log(window.scrollY));
    }

    reset() {

        this.setState({ title: "", body: "", key: "", dateevent:"", edit: false });
        $('#datetimepicker').data("DateTimePicker").date(null)
    }

    scrollToForm(){
        this.refs.top.scrollIntoView({behavior:"smooth", block:"start" ,});
    }

    datePickerValue(date){
        const date_moment=$('#datetimepicker').data("DateTimePicker").date();
        this.setState({dateevent:date_moment})
        console.log(date_moment)
    }

    onChange(e) {

        if (e.target.name === 'title') {
            this.setState({ title: e.target.value });
        } else {
            this.setState({ body: e.target.value });
        }
    }

    setedit(id, note) {

        const data = {  title: note.title, body: note.body, key: id, dateevent:moment(note.date_event), edit: true }
        $('#datetimepicker').data("DateTimePicker").date(moment(note.date_event))
        this.setState(data);
    }

    closeDialog() {
        this.setState(initialstate)
    }
    
    showDialog(show, title, body, time, cancelButton, onconfirm) {
            this.setState({ showDialog: show, datadialog: { title: title, body: body, settimeout: 0, cancelButton: false, onConfirm: () => this.closeDialog() } })
    }
    
    newNote(e) {
        e.preventDefault()

        if (!this.state.title.length > 0) {
            this.showDialog(true, 'Error', 'El titulo es necesario', 0, false, this.closeDialog.bind(this))
            return;
        }
        if (!this.state.body.length > 0) {
            this.showDialog(true, 'Error', 'El mensage es requerido', 0, false, this.closeDialog.bind(this))
            return;
        }
        const messagesRef = firebase.database().ref('/notas')
        const data = { title: this.state.title, body: this.state.body, date:moment.utc().format(),date_event:moment.utc(this.state.dateevent).format() }

        const key = this.state.key.length > 0 ? this.state.key : messagesRef.push().key;

        messagesRef.child(key).update(data)
            .then(() => {
                let msg = this.state.key.length > 0 ? 'Nota actualizada con exito!' : 'Nota creada con exito!';

                this.showDialog(true, 'Nota', msg, 5000, false, this.closeDialog.bind(this))
                this.reset()
            }, (err) => alert(err));
    }

    render() {
        return (<div ref="top" className = "App" >
            <div className = "App-header" >
                <div style={ {textAlign:'center',position:'relative'}}>
                    <div className ="App-logo" style={{display:'inline-block',width:'80px',height:'80px'}}>
                        <img src = { logo }  style={{width:'100%'}} alt="logo" />
                    </div>
                </div>
                <h2> Welcome to My Tasks App </h2> </div> 
                <div className = "container" >
                <form ref="form">
                    <div className = "form-group">
                        <label htmlFor = "title" > Titulo </label> 
                        <input className = "form-control" name = "title" id = "title"type = "text" onChange = { this.onChange.bind(this) } value = { this.state.title } autoComplete = "off"/>
                    </div> 
                    <div className = "form-group">
                        <label htmlFor = "body"> Nota </label> 
                        <textarea className = "form-control"name = "body" id = "body" onChange = { this.onChange.bind(this) } value = { this.state.body } autoComplete = "off"></textarea> 
                    </div> 
                    <label htmlFor = "datetimepicker"> Fecha del Evento</label> 
                    <DateTimePicker id="datetimepicker" icon="right" getValue={this.datePickerValue.bind(this)} defaultDate={this.state.dateevent} />
                    
                    <button type="button" id="send" className="btn btn-default" onClick={ this.newNote.bind(this) } disabled={!this.state.title.length || !this.state.body.length || !this.state.dateevent }> { this.state.edit ? 'Edit Task' : 'Save Task' } </button> 
                    {this.state.edit ? < button id = "canceledit" className = "btn btn-danger" onClick = { this.reset.bind(this) } > Cancel Edit </button> : ''} 
                </form> 
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">Notas</h3>
                    </div>
                    <div  className="panel-body">
                        <ListNotes setedit = { this.setedit.bind(this) } scrollToForm={this.scrollToForm.bind(this)}/>
                    </div>
                </div>
                <ScrollToTop showUnder={160}>
                    <ButtonUp />
                 </ScrollToTop>
                <ModalDialogs show = { this.state.showDialog } close = { this.closeDialog.bind(this) } {...this.state.datadialog }/> </div> 
            </div>
        );
    }
}
export default App;