import React, { useState, useEffect } from 'react'
import './transport.css'
import Loading from '../../../../components/loading'

import Env from '../../../../Env'
export default () => {


    const [loading, setLoading] = useState(false)
    const [vehicle, setVehicle] = useState('Parati')
    const [trips, setTrips] = useState([])
    const [lastTripJSON, setLastTripJSON] = useState({})
    const [searchTripMonth, setSearchTripMonth] = useState('')

    const lastTrip = (array) => {
        let lastTripDay = 0;
        let lastTripObject = {}

        array.map(trip => {
            let dayInt = parseInt(trip.day)

            if (dayInt > parseInt(lastTripDay)) {
                lastTripObject = trip
                lastTripDay = dayInt
            }
            else if (dayInt == parseInt(lastTripDay) &&
                (new Date(`${trip.year}-${trip.month}-${trip.day} ${trip.time}:00`)).getTime() > (new Date(`${lastTripObject.year}-${lastTripObject.month}-${lastTripObject.day} ${lastTripObject.time}:00`)).getTime()
            ) {
                lastTripObject = trip
                lastTripDay = dayInt
            }
        })

        return lastTripObject
    }
    const getReport = async (date, vehicleParam = vehicle) => {
        setSearchTripMonth(date)

        const dateSplited = date.split('-')
        const month = dateSplited[1]
        const year = dateSplited[0]

        const form = new FormData();

        console.log("Mês: " + month)
        console.log("Ano: " + year)
        console.log("Veículo: " + vehicleParam)

        form.append('month', month);
        form.append('year', year)
        form.append('vehicle', vehicleParam)

        console.log(window.localStorage.getItem('accessToken'))

        setLoading(true)
        const result = await fetch(Env.urlServer + '/index.php?route=findReport', {
            headers: {
                'token': window.localStorage.getItem('accessToken')
            },
            method: 'POST',
            body: form,
        })
        setLoading(false)

        const body = await result.json()
        console.log(body)

        const lastTripObject = lastTrip(body)

        setLastTripJSON(lastTripObject)
        setTrips(body)
    }

    useEffect(()=>{
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        const monthYear = `${year}-${month < 10 ? `0${month}` : month}`

        setSearchTripMonth(monthYear)

        getReport(monthYear)

        
    },[])

    return (
        <article style={{ width: '100%', height: '100%' }} >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Relatório de transporte</h1>
            </div>
            <div className='transportTabs'>
                <button className='transportTabsButtons' onClick={() => {setVehicle('Parati');getReport(searchTripMonth,'Parati')}} style={vehicle === 'Parati' ? {backgroundColor:'#38b000', color:'white'} : {}}>Parati</button>
                <button className='transportTabsButtons' onClick={() => {setVehicle('L200');getReport(searchTripMonth, 'L200') }} style={vehicle === 'L200' ? {backgroundColor:'#38b000', color:'white'} : {}}>L200</button>
                <button className='transportTabsButtons' onClick={() => {setVehicle('Amarok');getReport(searchTripMonth, 'Amarok')}} style={vehicle === 'Amarok' ? {backgroundColor:'#38b000', color:'white'} : {}}>Amarok</button>
                <button className='transportTabsButtons' onClick={() => {setVehicle('Micro-ônibus');getReport(searchTripMonth, 'Micro-ônibus')}} style={ vehicle === 'Micro-ônibus' ? {backgroundColor:'#38b000', color:'white',borderRight: 0} : {borderRight: 0}}>Micro-ônibus</button>
            </div>
            <div className='informationContainer'>
                {loading ?
                    <div style={{ height: '5vw', width: '5vw' }}>
                        <Loading />
                    </div>
                    :
                    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', marginLeft: '1vw' }}>
                        <div style={{ marginTop: '1vw' }}>
                            <input value={searchTripMonth} type={'month'} onChange={e => {getReport(e.target.value)}} />
                        </div>
                        <div>
                            <p>Quantidade de viagens: {trips.length}</p>
                            {
                                lastTripJSON.day != undefined && <div style={{marginTop:'2vw'}}>
                                    <h2>Última viagem</h2>
                                    <p><b>Data</b>: {lastTripJSON.day}/{lastTripJSON.month}/{lastTripJSON.year}</p>
                                    <p><b>Horário</b>: {lastTripJSON.time}</p>
                                    <p><b>Motorista</b>: {lastTripJSON.driver}</p>
                                    <p><b>Destino</b>: {lastTripJSON.destiny}</p>
                                    <p><b>Data prevista de saída</b>: {lastTripJSON.dateBack.replace(/[-]/g,'/')}</p>
                                    <p><b>Horário previsto de saída</b>: {lastTripJSON.timeback}</p>
                                    <p><b>Data de requisição</b>: {lastTripJSON.requestDate.replace(/[-]/g,'/')}</p>
                                </div>
                            }
                        </div>
                        {/* <button className='insertReport'>✚ Inserir relatório</button> */}
                    </div>


                }
            </div>
        </article>
    )
}