import React, { Component } from 'react';
import './Task.css';
import moment from 'moment';
/*import countdown from 'countdown';*/
class Task extends Component {

    constructor(props){
        super(props)

        this.state = {
            isFinalize:false,
            countdown:{days:0,hours:0,mins:0,secs:0},
            task:[]
        }
        this.timerId = null;
    }

    
    componentWillReceiveProps(nextProps) {
       
        if(nextProps.task){
            this.setState({task:nextProps.task,isFinalize:moment(nextProps.task.start).isBefore(moment())})
            this.startCounter(nextProps.task);
        }
            
    }

    componentWillMount() {
        if(this.props.task){
            this.setState({task:this.props.task,isFinalize:moment(this.props.task.start).isBefore(moment())})
            this.startCounter(this.props.task); 
        }  
    }

    startCounter(task,isFinalize){
        this.clearCounter();
        this.timerId = setInterval(()=>{
            const formattedGivenDate = new Date(moment(task.start,"YYYY-MM-DD HH:mm:ss Z"))
            const today = new Date();
	        const msDiff = formattedGivenDate - today;
	        const days = parseInt(msDiff / (24 * 3600 * 1000),10);
	        const hours = parseInt(msDiff / (3600 * 1000) - (days * 24),10);
	        const mins = parseInt(msDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60),10);
	        const secs = parseInt(msDiff / (1000) - (mins * 60) - (days * 24 * 60 * 60) - (hours * 60 * 60),10);
            this.setState({countdown:{days,hours,mins,secs}})
            if( days === 0 && hours === 0 && mins === 0 && secs === 0 ){
                this.setState({isFinalize:true})
                this.clearCounter();
            }
        },1000)
        
                
        
    }

    clearCounter(){
        if(this.timerId){
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    componentWillUnmount() {
        this.clearCounter();
    }

    showDetails(){
        if(this.state.task)
            this.props.showDetails(this.state.task)
    } 
    renderDigits(digit,type){
        return digit +" "+ type;
    }
    render() {
        const { id, remove ,edit } = this.props;
        const { task, countdown,isFinalize } = this.state;
        return(
            <div className="well">
                <div className="tools">
                    <i className="fa fa-info-circle" aria-hidden="true" onClick={()=>this.showDetails()}></i>
                    <i className="fa fa-times" aria-hidden="true" onClick={ ()=>remove(id) }></i>
                    <i className="fa fa-pencil" aria-hidden="true" onClick={()=> edit(id,task)}></i>
                    
                </div>
                {isFinalize ? <div className="ribbon-box left"><div className="ribbon"><a>Finalizado</a></div></div> : ""}
                <p><strong>Titulo :</strong> { task.title }</p>
                <p><strong>Comentario :</strong> { task.body }</p>
                <p><strong>Creado :</strong> { moment(task.creation_date).format('DD/MM/YYYY HH:mm:ss za') }</p>
                <p><strong>Fecha del evento :</strong> { moment(task.start).format('DD/MM/YYYY HH:mm:ss za') }</p>
                <p><strong>Fecha de Notificación :</strong> { moment(task.date_notify).format('DD/MM/YYYY HH:mm:ss za') }</p>
                {isFinalize ? "" : 
                <div className="counttime">
                    <div className="items-date">
                        <span>{countdown.days}</span>
                        <em>days</em>
                    </div>
                    <div className="items-date">
                        <span>{countdown.hours}</span>
                        <em>hours</em>
                    </div>
                    <div className="items-date">
                        <span>{countdown.mins}</span>
                        <em>minutes</em>
                    </div>
                    <div className="items-date">
                        <span>{countdown.secs}</span>
                        <em>seconds</em>
                    </div>
                </div>}
            </div> 
        )
    }
}
export default Task;