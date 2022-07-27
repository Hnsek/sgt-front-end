import React, { useState } from 'react';
import './App.css';
import Calendar from './modules/calendar/calendar'
import VehicleReports from './modules/vehicleReports/vehicleReports'
import { Route, Routes, Link, Navigate, Redirect } from 'react-router-dom'
import './App.css'

export default () => {
  const [authenticated, setAuthenticated] = useState(true)
  return (
      
      <div className='body'>
       <Routes >
        <Route path='/calendario' element={<Calendar authenticated={authenticated} />} />
        <Route defa path='/relatorios-veiculares' element={ authenticated ? <VehicleReports authenticated={authenticated}  /> : <Navigate to='/calendario'/>} />
        <Route path="*" element={<Navigate to="/calendario" />} />
        </Routes>
      </div>

  );
}

