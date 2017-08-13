import React, { Component } from 'react';
import moment from 'moment';
import './Details.css'
import CircularProgressbar from 'react-circular-progressbar';
class Details extends Component {
    
    state = { task:this.props.task,isFinalize:moment(this.props.task.start).isBefore(moment()),countdown:{days:0,hours:0,mins:0,secs:0} }
    timerId = null;

    componentWillMount() {

        this.startCounter(this.props.task);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({task:nextProps.task})
        this.startCounter(this.state.task);
    }

    startCounter(task){  
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
        if(this.timerId){clearInterval(this.timerId)}
    }
    render() {
        const { task , countdown,isFinalize} = this.state
        return (
            <div className="modalback">
                <div className="well details">
                    <div className="tools">
                        <i className="fa fa-times" aria-hidden="true" onClick={()=>this.props.close()}></i>
                    </div>
                    <h3><i className="fa fa-clock-o" aria-hidden="true"></i> {task.title}</h3>
                    <blockquote>
                        <p>{task.body}</p>
                        {!isFinalize ? <small>{`Faltan : ${countdown.days} days ${countdown.hours} hours ${countdown.mins} mins ${countdown.secs} seconds`}</small> : "Finish"}
                    </blockquote>
                    
                    {!isFinalize ?<div className="progress-timer">
                        <CircularProgressbar percentage={(countdown.days*100) / 31} textForPercentage={(pct)=>`${countdown.days} days`}/>
                        <CircularProgressbar percentage={(countdown.hours*100) / 24} textForPercentage={(pct)=>`${countdown.hours} hours`}/>
                        <CircularProgressbar percentage={(countdown.mins*100) / 60} textForPercentage={(pct)=>` ${countdown.mins} mins`}/>
                        <CircularProgressbar percentage={(countdown.secs*100) / 60 } textForPercentage={(pct)=>`${countdown.secs} secs`} initialAnimation={true}/>

                    </div>:""}
                </div>
            </div>
        );
    }
}

export default Details;