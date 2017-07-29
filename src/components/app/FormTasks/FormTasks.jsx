import React, { Component } from 'react';
import DateTimePick from '../../DateTime/DateTime'

class FormTasks extends Component {

    clearDateTime(){

        this.refs.datetime.clear();
    }

    render() {
            const { formIsValid , title, body, onChangeInputs, datePickerChange, datetimeOps, dateevent, edit, reset, avislabel , pruevas} = this.props
            const inputErrorStyle = { borderColor:'red' }
        return (
            
            <form id="formtasks" onSubmit={(e) => this.props.newtask(e)} ref={this.props.formref}>
                <div className="form-group">
                    <label htmlFor = "title" > Titulo </label> 
                    <input style={ formIsValid.title ? {} : inputErrorStyle } className = "form-control" name="title" id="title" type="text" onChange={(e)=>onChangeInputs(e) } value={ title } autoComplete = "off"/>
                </div> 
                <div className="form-group">
                    <label htmlFor="body"> Tarea </label> 
                    <textarea style={formIsValid.body ? {} : inputErrorStyle } className="form-control" name="body" id="body" onChange={ (e)=> onChangeInputs(e) } value={ body } autoComplete = "off"></textarea> 
                </div> 
                                
                <div className="form-group">
                    <label htmlFor = "datetimepicker1"> Fecha del Evento</label>
                    <DateTimePick ref="datetime" date={ dateevent } options={ datetimeOps } onChange={(e)=> datePickerChange(e) }/>
                </div>
                <button className="btn btn-default" onClick={(e)=>pruevas(e)}>Pruevas</button>
                <div className="form-group">
                <div className="dropdown" style={{display:'inline-block'}}>
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Avisame : 
                        <span style={{marginLeft:'5px'}}className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a data-num="0" data-format="x">nada</a></li>
                        <li><a data-num="5" data-format="m">5 min antes</a></li>
                        <li><a data-num="15" data-format="m">15 min antes</a></li>
                        <li><a data-num="1" data-format="h">1 hora antes</a></li>
                        <li><a data-num="5" data-format="h"> 5 horas antes</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a data-num="1" data-format="d">1 dia antes</a></li>
                        <li><a data-num="3" data-format="d">3 dias antes</a></li>
                    </ul>
                </div>
                <p style={{display:'inline-block',verticalAlign:'top', marginTop:'10px'}}>{avislabel}</p>
                </div>
                <button type="submit" id="save" className="btn btn-default"  disabled={!title.length || !body.length || !dateevent }><span className="fa fa-floppy-o" aria-hidden="true"></span>  { edit ? 'Edit Task' : 'Save Task' } </button> 
                {edit ? < button id = "canceledit" className = "btn btn-danger" onClick = {()=> reset() } > Cancel Edit </button> : ''} 
            </form> 
        );
    }
}

export default FormTasks;