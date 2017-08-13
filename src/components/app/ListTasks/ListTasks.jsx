import React, { Component } from 'react';
import Task from '../Task/Task';
import EmptyList from './EmptyList/EmptyList'
import firebase from 'firebase';
import ModalDialogs,{ initialDialogstate } from '../../ModalDialogs/ModalDialog';
import Pagination from '../../Pagination/Pagination'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import _ from 'lodash'

import './ListTasks.css'
class ListTasks extends Component {
    
    state = {
        
        initialDialogstate,
        tasks:[],
        pageOfItems: []
    }
  
    edit(id,note) {
        this.props.setedit(id,note)
        
    }
    closeDialog() {
        this.setState(initialDialogstate);
    }
    
    remove(id) {
        this.setState({
            showDialog:true,
            datadialog:{
                title:'Eliminar Nota',
                body:'¿Seguro quires elimnar la nota ' + id + '?',
                cancelButton:true,
                onConfirm:() => {
                    firebase.database().ref('/tasks/'+id).remove().then(()=>{
                        
                        NotificationManager.success('Tarea eliminada con exito!', 'Ok', 2000, null, false);
                    },err=>{console.error(err)});
                    this.closeDialog()
                },
                onCancel:()=>this.setState({showDialog:false})
            }
        })
                  
    }
    componentWillMount() {
        firebase.database().ref('/tasks').orderByChild('start').on('value',(snapshot)=>{
            this.setState({tasks:snapshot.val()})
            
        })
    }
    componentWillUnmount() {
        firebase.database().ref('/tasks').off();
    }
    
    showDetails(task){
        this.props.showDetails(task)
    }

    showForm(){
        this.props.showForm();
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        const { tasks, showDialog, pageOfItems, datadialog} = this.state
        return(
            <div className="list-notes">
                <p>{`Count :${tasks ? Object.keys(tasks).length:''}`}</p>
                <TransitionGroup>
                {
                 tasks ? _.map(pageOfItems, (key,i)=> 
                        <CSSTransition key={key} classNames="fade" timeout={800}>
                            <Task key={key} id={key} task={tasks[key]} edit={ this.edit.bind(this) } showDetails={(task)=>this.showDetails(task)} remove={this.remove.bind(this)}/>
                        </CSSTransition>
                    ):<EmptyList showForm={this.showForm.bind(this)}/> 
                    
                }
                </TransitionGroup>
            <ModalDialogs show={showDialog} close={this.closeDialog.bind(this)} {...datadialog}/>
            {tasks?<Pagination items={tasks} onChangePage={this.onChangePage.bind(this)}/>:''}
            <NotificationContainer/>
            </div> 
        )
    }
}
export default ListTasks;