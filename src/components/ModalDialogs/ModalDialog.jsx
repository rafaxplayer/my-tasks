import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalDialog.css';

class ModalDialog extends Component {

    state = { show:false, timer:false, timertext:0 }
    
    componentWillReceiveProps(nextProps) { 

        this.setState({show:nextProps.show});
        
        if(nextProps.settimeout > 0){
     
            this.setState({timer:true, timertext:nextProps.settimeout})

            const interval = setInterval(()=>{
                this.interValInit(interval);
                
            },1000);
            
        }
    }

    interValInit(id) {

        this.setState((prev)=>{
            return {timertext:prev.timertext-1000}
        });

        console.log(this.state.timertext)
        if(this.state.timertext <= 0){
            console.log('llega')
            clearInterval(id);
            this.setState({show:false, timer:false, timertext:0})
        }
    }
    
    hiddeDialog(){ this.setState({show:false} )}

    render() {
        const{ title, body, confirmText, cancelButton, cancelText, onConfirm} = this.props
        return !this.state.show ? (<div></div>):(
            <div className="modalback">
                <div className="window">
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="buttons">
                    {
                    cancelButton?(<button className="btn btn-btn-danger" onClick={()=>this.props.close()}>{cancelText?cancelText:'Cancel'}</button>):''
                    }
                    <button className="btn btn-primary" onClick={onConfirm}>
                        {confirmText?confirmText:'Ok'}
                    </button>
                </div>
                {this.state.timer?<p className="timer">Cerrando en: { this.state.timertext/1000 }</p>:''}
            </div>
            
        </div>
        );
    }
}

ModalDialog.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  cancelButton: PropTypes.bool,
  show: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm :PropTypes.func
};

export const initialstate = { showDialog:false,datadialog:{title:'Modal Title', body:'Modal Body',confirmText:'Ok',cancelButton:true,cancelText:'Cancel',onConfirm:null,onCancel:null }}
export default ModalDialog;