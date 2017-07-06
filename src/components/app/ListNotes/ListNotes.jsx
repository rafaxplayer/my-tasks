import React, { Component } from 'react';
import firebase from 'firebase';
import Note from '../Note/Note';
import './ListNotes.css';
import ModalDialogs,{ initialstate } from '../../ModalDialogs/ModalDialog';

class ListNotes extends Component {
    
    state= {
        notas:[],
        initialstate
    }
  
    edit(id,note) {
        this.props.setedit(id,note)
        this.props.scrollToForm();
    }
    closeDialog() {
        this.setState(initialstate);
    }
    
    remove(id) {
        this.setState({
            showDialog:true,
            datadialog:{
                title:'Eliminar Nota',
                body:'¿Seguro quires elimnar la nota ' + id + '?',
                cancelButton:true,
                onConfirm:() => {
                    firebase.database().ref('/notas/'+id).remove().then(()=>{
                        this.setState({
                            showDialog:true,
                            datadialog:{
                                title:'Ok',
                                body:'Nota eliminada con exito!',
                                cancelButton:false,
                                onConfirm:()=>this.closeDialog(),
                                settimeout:5000
                                }
                        })
                    },err=>{console.error(err)});
                    this.closeDialog()
                },
                onCancel:()=>this.setState({showDialog:false})
            }
        })
                  
    }

    componentWillMount() {
        firebase.database().ref('/notas').on('value',(snapshot)=>{
            this.setState({notas:snapshot.val()})
        })
    }
    
    render() {
        return(
            <div className="list-notes">
                {this.state.notas?Object.keys(this.state.notas).map((key,i) => <Note key={key} id={key} note={this.state.notas[key]} edit={ this.edit.bind(this) } remove={this.remove.bind(this)}/>):''}
            
            <ModalDialogs show={this.state.showDialog} close={this.closeDialog.bind(this)} {...this.state.datadialog}/>
            </div> 
        )
    }
}
export default ListNotes;