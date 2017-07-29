import React from 'react';
import './EmptyList.css'
const EmptyList=(props)=><div className="well empty-list" onClick={()=>props.showForm()}><i className="fa fa-list-alt fa-5x" aria-hidden="true"></i><h2 style={{textAlign:'center'}}>Ups! No hay tareas programadas</h2></div>
export default EmptyList;
