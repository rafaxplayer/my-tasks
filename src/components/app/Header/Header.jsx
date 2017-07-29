import React, { Component } from 'react';
import CalendarIcon from '../../CalendarIcon/CalendraIcon'
import './Header.css'
import $ from 'jquery'
class Header extends Component {
    state = {  }

    showMenu(){
        if($('.button-nav').css('display') !== 'none')
            $('.App-header-nav > ul').slideToggle();
    }
    render() {
        return (
            <div className="App-header" >
                <nav className="App-header-nav">
                    <i className="button-nav fa fa-bars fa-2x" aria-hidden="true" onClick={() => this.showMenu()} ></i>
                    <ul>
                        <li onClick={()=>this.props.renderCalendar(true)}>Home</li>
                        <li onClick={()=>this.props.renderCalendar(false)}>Tasks</li>
                        <li onClick={()=>{if($('.container form').is(':hidden')){this.props.showForm()};this.showMenu()}}>New Task</li>
                        <li onClick={()=>this.props.renderCalendar(true)}>Calendar </li>
                        
                    </ul>
                </nav>
                <div style={{textAlign:'center',position:'relative',marginTop:'20px'}}>
                    <div className ="App-logo" style={{display:'inline-block'}}>
                        <CalendarIcon/>
                    </div>
                </div>
                <h1> Welcome to My Tasks App </h1> 
            <i  className={this.props.formishidde ? "add fa fa-plus" : "add fa fa-times"} aria-hidden="true" onClick={()=>this.props.showForm()}></i>
            </div> 
        );
    }
}

export default Header;