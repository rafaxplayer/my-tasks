import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import '../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
import datetimepicker from 'eonasdan-bootstrap-datetimepicker'
import $ from 'jquery';
class DateTime extends Component {

    picker = null;
    
    defaultOps={
        format: 'DD/MM/YYYY h:mm:ss a',
        showTodayButton:true,
        showClear:true,
        icons:{
            time: 'fa fa-clock-o ',
            date: 'fa fa-calendar',
            up: 'fa fa-angle-up',
            down: 'fa fa-angle-down',
            previous: 'fa fa-angle-left',
            next: 'fa fa-angle-right',
            today: 'fa fa-crosshairs',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
        }
    }
     
    componentDidMount() {
        this.iniPicker()

    }

    iniPicker(){
        if(this.picker){ this.picker.data("DateTimePicker").destroy() }
        this.picker = $(findDOMNode(this.refs.datetimepicker));     
        this.picker.datetimepicker(this.defaultOps);
        
        this.picker.on('dp.change',(e)=>{
            if(this.props.onChange)
                this.props.onChange(e)
        })

        this.picker.on('dp.show',(e)=>{
            if(this.props.onShow)
                this.props.onShow(e)
        })

        this.picker.on('dp.hide',(e)=>{
            if(this.props.onHide)
                this.props.onHide(e)
        })
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.date){
            
            this.picker.data("DateTimePicker").date(nextProps.date)
        }
        if(nextProps.format){
            this.picker.data("DateTimePicker").format(nextProps.format)
        }
        if(nextProps.options){
            this.picker.data("DateTimePicker").options(nextProps.options)
        }
        
    }

    componentWillUnmount() {
        this.picker.data("DateTimePicker").destroy();
    }

    toggle(){ this.picker.data("DateTimePicker").toggle();}

    clear(){this.picker.data("DateTimePicker").date(null)}
    
    render() {
        return (
            <div className='input-group date' ref="datetimepicker" id='datetimepicker'>
                <input type='text' className="form-control" />
                <span className="input-group-addon">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                </span>
            </div>
        );
    }
    
}

DateTime.propTypes={
    date:PropTypes.object,
    onHide:PropTypes.func,
    onShow:PropTypes.func,
    options:PropTypes.object,
    format:PropTypes.string

}

export default DateTime;