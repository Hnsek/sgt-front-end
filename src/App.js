import React, { useState } from 'react';
import './App.css';
import Calendar from './modules/calendar/calendar'
import VehicleReports from './modules/vehicleReports/vehicleReports'
import Login from './modules/login/login'

import { Route, Routes, Link, Navigate, Redirect, BrowserRouter } from 'react-router-dom'
import './App.css'

export default () => {
  const [authenticated, setAuthenticated] = useState(false)

  useState(()=>{
    if(window.localStorage.getItem('accessToken') != null){
      setAuthenticated(true)
    }
  })
  return (

    <div className='body'>
      <Routes >
        <Route path='/relatorios-veicular' element={authenticated ? <VehicleReports authenticated={authenticated} /> : <Navigate to='/calendario' />} />
        <Route path='/login' element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <Navigate to='/calendario' />} />
        <Route path='/calendario' element={<Calendar authenticated={authenticated} />} />
        <Route path="*" element={<Navigate to="/calendario" />} />
      </Routes >
    </div >

  );
}

