import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import 'react-notifications/lib/notifications.css'
import ListTasks from './ListTasks/ListTasks'
import Calendar from "./Calendar/Calendar.jsx"
import firebase from 'firebase'
import ModalDialogs, { initialDialogstate } from '../ModalDialogs/ModalDialog'
import ButtonUp from '../ButtonUp/ButtonUp'
import ScrollToTop  from 'react-scroll-up'
import moment from 'moment';
import Details from './Details/Details'
import Header from './Header/Header'
import FormTasks from './FormTasks/FormTasks'
import _ from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import CalendarIcon from '../CalendarIcon/CalendraIcon'
import $ from 'jquery'
import scrollTo from 'jquery.scrollto'

class App extends Component {

    state = {
        title: "",
        body: "",
        key: "",
        avislabel:"",
        dateevent:null,
        datenotify:null,
        formishidde:true,
        formIsValid:{title:false, body:false, date:true},
        avismodify:{n:0,f:'m'},
        edit: false,
        datetimeOps:null,
        showDetails:false,
        task:null,
        tasks:[],
        renderCalendar:true,
        initialDialogstate
    }
  
    messagesRef = firebase.database().ref('/notas')
    interval = null;
    
    componentWillMount(){
               
        firebase.database().ref('/notas').orderByChild('date_event').on('value',(snapshot)=>{
            this.setState({tasks:snapshot.val()})
        })
       
       
        $(".dropdown-menu li a").on('click', (e) => {
            e.preventDefault();
            let selText = e.currentTarget.innerHTML;
            this.setState({avislabel:selText})
            if(this.state.dateevent){
                    
                this.setState({avismodify:{n:e.currentTarget.dataset.num,f:e.currentTarget.dataset.format}})
                console.log(this.state.avismodify)
            }else{
                
                NotificationManager.error('No has seleccionado ninguna fecha para el evento.', 'Error', 3000, null, false);
                this.setState({avislabel:""})
            }
               
        })

        this.interval = setInterval(() => {
            firebase.database().ref('/notas').once('value',(snapshot) => {
                snapshot.forEach((snap) => {
                    if(moment(moment()).isAfter(snap.val().date_notify)&& !snap.val().notify){
                        NotificationManager.success(snap.val().body, snap.val().title, 0, null, false);
                        firebase.database().ref('/notas').child(snap.key).update({notify:true})
                    }
                })
            })
        },1000)
       
    }

    reset() {
        this.setState({ title: "", body: "", key: "", dateevent:null, datenotify:null, edit:false, avismodify:{n:0,f:'m'}});
        this.refs.FormComponent.clearDateTime();
    }
    
    onChangeInputs(e) {
        const data = this.state.formIsValid
        if(e.target){
            if (e.target.name === 'title') {
                data.title =! _.isEmpty(e.target.value);
                this.setState({ title: _.capitalize(e.target.value),data});
                
            } else if (e.target.name === 'body'){
                data.body =! _.isEmpty(e.target.value);
                this.setState({ body: _.capitalize(e.target.value),data});
            }
        }
        
    }

    datePickerChange(e){
        if(e.date){
            const select_date = e.date;
            const today = moment();
    
            if(select_date.isBefore(today,'second')){
                NotificationManager.error('No puedes programar eventos en fechas anteriores a hoy.', 'Error', 3000, null, false);
                this.setState({dateevent:null,datenotify:null,showcalendar:false})
                return;
            }
            this.setState({dateevent:select_date,datenotify:select_date})
        }
        
    }

    showDetails(task){
        this.setState({task:task,showDetails:true})
    }
   
    setedit(id, note) {
        const data = {  title: note.title, body: note.body, key: id, dateevent:moment(note.date_event),datenotify:moment(note.date_notify), edit: true }
        this.setState(data);
        if(this.state.formishidde){
            this.showForm();
        }
        this.scrollToForm();
            
    }
    renderCalendar(bool){
        this.setState({renderCalendar:bool})
    }
    closeDialog() {
        this.setState(initialDialogstate)
    }
    
    closeDetails(){
        this.setState({showDetails:false})
    }
    
    showDialog(show, title, body, time, cancelButton, onconfirm) {
        this.setState({ showDialog: show, datadialog: { title: title, body: body, settimeout: 0, cancelButton: false, onConfirm: () => this.closeDialog() } })
    }
    
    newTask(e) {
        e.preventDefault()
        if (!this.state.dateevent){
            NotificationManager.error('No se ha selecionado una fecha valida para el vento.', 'Error', 0, null, false);
            return;
        }
        
        const data = { 
            title: this.state.title, 
            body: this.state.body, 
            creation_date:moment().format(),
            date_event: moment(this.state.dateevent).format(),
            date_notify: this.state.key.length > 0 ? moment(this.state.datenotify).format():moment(this.state.datenotify).subtract(this.state.avismodify.n,this.state.avismodify.f).format(),
            notify:false
        }
        
        const tasksRef = firebase.database().ref('/notas')
        const key = this.state.key.length > 0 ? this.state.key : tasksRef.push().key;

        tasksRef.child(key).update(data)
            .then(() => {
                let msg = this.state.key.length > 0 ? 'Nota actualizada con exito!' : 'Nota creada con exito!';
                this.showDialog(true, 'Nota', msg, 5000, false, this.closeDialog.bind(this))
                this.reset()
            }, (err) => alert(err));
    }

    showForm(){
        $('.container form').slideToggle(()=>{
            this.setState({formishidde:$('.container form').is(':hidden')});
        });

        this.scrollToForm();
    }

    scrollToForm(){
        $.scrollTo(ReactDOM.findDOMNode(this.formRef),{
            duration:800,
            offset:{left:0,top:-100}})
             
    }

    showCalendar(){
        this.setState({showcalendar:!this.state.showcalendar});
    }

    pruevas = (e) => {
        e.preventDefault();
        
    }

    componentWillUnmount() {
        if(this.interval){clearInterval(this.interval)}
    }

    render() {
        const inputErrorStyle={borderColor:'red'}
        return (
        <div className="App" >
            <Header  formishidde={this.state.formishidde} showForm={()=>this.showForm()} renderCalendar={(b)=>this.renderCalendar(b)}/>
                <div className="container">
                    <FormTasks
                        ref="FormComponent"
                        formref={el => this.formRef = el}
                        newtask={(e)=>this.newTask(e)}
                        formIsValid={this.state.formIsValid}
                        onChangeInputs={(e)=>this.onChangeInputs(e)}
                        datePickerChange={(e)=>this.datePickerChange(e)}
                        reset={()=>this.reset()}
                        datetimeOps={this.state.datetimeOps}
                        dateevent={this.state.dateevent}
                        title={this.state.title}
                        body={this.state.body}
                        edit={this.state.edit}
                        avislabel={this.state.avislabel}
                        pruevas={(e)=>this.pruevas(e)}/>
                        
                {this.state.renderCalendar ? <Calendar tasks={this.state.tasks}/>:<div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title" style={{textShadow: '-1px -1px 0 rgba(0, 0, 0, 0.3)'}}>Tareas</h3>
                    </div>
                    <div  className="panel-body">
                        <ListTasks 
                            tasks={this.state.tasks} 
                            setedit={ this.setedit.bind(this) } 
                            showForm={this.showForm.bind(this)} 
                            showDetails={this.showDetails.bind(this)}/>
                    </div>
                </div> }
                    <ScrollToTop style={{zIndex:'9999999'}} showUnder={160}>
                        <ButtonUp />
                    </ScrollToTop>
                    <ModalDialogs 
                        show = { this.state.showDialog } 
                        close = { this.closeDialog.bind(this) } 
                        {...this.state.datadialog }/> 
                </div> 
                <NotificationContainer/>
                {this.state.showDetails ? <Details task={this.state.task} close={this.closeDetails.bind(this)}/> : ''}
            </div>
        );
    }
}
export default App;