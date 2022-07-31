import React, { useEffect, useState } from 'react'
import './dayData.css'
import Loading from '../../../../components/loading'

import Env from '../../../../Env'

export default ({ setInformationDaysVisible, informationDay, setInformationDays, day, month, year, refreshDays }) => {


    const [dataViagem, setDataViagem] = useState('')
    const [horarioSaida, setHorarioSaida] = useState('')
    const [veiculo, setVeiculo] = useState('Parati')
    const [dataPedido, setDataPedido] = useState('')
    const [motorista, setMotorista] = useState('')
    const [destino, setDestino] = useState('')
    const [dataPrevistaVolta, setDataPrevistaVolta] = useState('')
    const [horarioPrevitoVolta, setHorarioPrevitoVolta] = useState('')

    const [sendTripLoading, setSendTripLoading] = useState(false)

    const [errorSendTrip, setErrorSendTrip] = useState(undefined)
    const [succeedSendTrip, setSucceedSendTrip] = useState(undefined)


    const deleteTravel = (idDayExcluded) => {
        // console.log("Executed")
        // setDays({
        //         previousDay:[],
        //         mainDays:{},
        //         laterDays:[]
        //     })
        setInformationDays(days => days.filter(day => day.__id != idDayExcluded))
    }

    // const [dataViagem, setDataViagem] = useState('')
    // const [horarioSaida, setHorarioSaida] = useState('')
    // const [veiculo, setVeiculo] = useState('')
    // const [dataPedido, setDataPedido] = useState('')
    // const [motorista, setMotorista] = useState('')
    // const [destino, setDestino] = useState('')
    // const [dataPrevistaVolta, setDataPrevistaVolta] = useState('')
    // const [horarioPrevitoVolta, setHorarioPrevitoVolta] = useState('')

    const sendTravel = () => {

        const separatedTripDate = dataViagem.split('-')

        const form = new FormData();

        const monthFormated = month < 10 ? `0${month}` : month.toString()

        form.append('day', day);
        form.append('month', monthFormated);
        form.append('year', year);
        form.append('category', veiculo);
        form.append('time', horarioSaida);
        form.append('requestDate', dataPedido);
        form.append('driver', motorista);
        form.append('destiny', destino);
        form.append('dateBack', dataPrevistaVolta);
        form.append('timeback', horarioPrevitoVolta);
        

        setSendTripLoading(true)
        fetch(Env.urlServer + '/index.php?route=registerTrip', {
            method: 'POST',
            body: form,
        })
            .then(async resultComplete => {
                const result = await resultComplete.json();
                
                if(result === 1){
                    setErrorSendTrip(undefined)
                    setSucceedSendTrip("Viagem cadastrada com sucesso")
                    setErrorSendTrip(undefined)
                    setInformationDays(iD => [...iD, {
                        day:day,
                        month:monthFormated,
                        year:year,
                        category:veiculo,
                        time: horarioSaida,
                        requestDate:dataPedido,
                        driver:motorista,
                        destiny:destino,
                        dateBack:dataPrevistaVolta,
                        timeback:horarioPrevitoVolta
                    }])
                }
                else{
                    setSucceedSendTrip(undefined)
                    setErrorSendTrip("Não foi possível efetuar o cadastro da viagem")
                }

                setSendTripLoading(false)
                
            })
            .catch(erro => {
                setSendTripLoading(false)
                setErrorSendTrip("Não foi possível efetuar o cadastro da viagem")
                console.log(erro)
                })

    }

    return (
        <section className='backgroundInformationDay'>
            <div className='quitInformationDay'>

                <button className='quitInformationDayButton' onClick={() => {
                    setInformationDaysVisible(false)
                    refreshDays(year, month)
                    }}>

                </button>
                {
                    sendTripLoading ?
                        <div className='containerAddTravel' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{height:'5vw', width:'5vw'}}>
                                <Loading />
                            </div>
                        </div>
                        :
                        <div className='containerAddTravel'>
                            <h1 className='titleAddTravel'>Cadastrar Viagem</h1>

                            {/* <div className='containerInputs'>
                                <label>Data da viagem: </label>
                                <input className='inputs' value={dataViagem} onChange={(value) => setDataViagem(value.target.value)} type={'date'}></input>
                            </div> */}
                            <div className='containerInputs'>
                                <label>Horário da saída: </label>
                                <input className='inputs' value={horarioSaida} onChange={(value) => setHorarioSaida(value.target.value)} type={'time'}></input>
                            </div>
                            <div className='containerInputs'>
                                <label>Veículo: </label>
                                {/* <input className='inputs' value={veiculo} onChange={(value) => setVeiculo(value.target.value)}></input> */}
                                <select id="selectVeiculo" onChange={(e)=>setVeiculo(e.target.value)}>
                                    <option value='Parati'>Parati</option>
                                    <option value='Amarok'>Amarok</option>
                                    <option value='L200'>L200</option>
                                    <option value='Micro-ônibus'>Micro-ônibus</option>
                                </select>
                            </div>
                            <div className='containerInputs'>
                                <label>Data de pedido: </label>
                                <input className='inputs' value={dataPedido} onChange={(value) => setDataPedido(value.target.value)} type={'date'}></input>
                            </div>
                            <div className='containerInputs'>
                                <label>Motorista: </label>
                                <input className='inputs' value={motorista} onChange={(value) => setMotorista(value.target.value)}></input>
                            </div>
                            <div className='containerInputs'>
                                <label>Destino: </label>
                                <input className='inputs' value={destino} onChange={(value) => setDestino(value.target.value)}></input>
                            </div>
                            <div className='containerInputs'>
                                <label>Data prevista de volta: </label>
                                <input className='inputs' value={dataPrevistaVolta} onChange={(value) => setDataPrevistaVolta(value.target.value)} type={'date'}></input>
                            </div>
                            <div className='containerInputs'>
                                <label>Horário previsto de volta: </label>
                                <input className='inputs' value={horarioPrevitoVolta} onChange={(value) => setHorarioPrevitoVolta(value.target.value)} type={'time'}></input>
                            </div>

                            {
                                errorSendTrip !== undefined && <span style={{color:'red', marginBottom:'-1.5vw', fontSize:'1vw'}}>{errorSendTrip}</span>
                            }
                            {
                                succeedSendTrip !== undefined && <span style={{color:'green', marginBottom:'-1.5vw', fontSize:'1vw'}}>{succeedSendTrip}</span>
                            }

                            <button className="actionButtons" id='registerTravel' onClick={() => sendTravel()}>Cadastrar viagem</button>
                        </div>
                }

            </div>
            <article id="containerInformationDay" className='containerInformationDay'>
                <div className='headerContainerInformationDay'>
                    <button className='buttonQuiteInformationDay' onClick={() => {
                        setInformationDaysVisible(false)
                        refreshDays(year, month)
                        }}>

                    </button>
                </div>
                <div style={{ overflow: 'auto', overflowX: 'hidden', width: '100%' }}>

                    {
                        informationDay.map(infoDay => {
                            // console.log("Infoday: ", infoDay)
                            // console.log("Informationday: ", informationDay)
                            if(infoDay.day === day){

                            
                            return <div className='containerInfoDay'>
                                <span className='itemInfoDay' style={{ marginTop: '1vw' }}>{`Data da viagem: ${infoDay.day}/${infoDay.month}/${infoDay.year}`}</span>
                                <span className='itemInfoDay'>{`Horário de saída: ${infoDay.time}`}</span>
                                <span className='itemInfoDay'>{`Veículo: ${infoDay.category}`}</span>
                                <span className='itemInfoDay'>{`Data do pedido: ${infoDay.requestDate.replace(/-/g, '/')}`}</span>
                                <span className='itemInfoDay'>{`Motorista: ${infoDay.driver}`}</span>
                                <span className='itemInfoDay'>{`Destino: ${infoDay.destiny}`}</span>
                                <span className='itemInfoDay'>{`Data prevista de volta: ${infoDay.dateBack} `}</span>
                                <span className='itemInfoDay'>{`Horário previsto de volta: ${infoDay.timeback} `}</span>
                                <div className='containerActionButtons'>
                                    <button className="actionButtons" onClick={() => deleteTravel(infoDay.__id)}>Excluir</button>
                                    {/* <button className="actionButtons">Modificar</button> */}
                                </div>
                                <hr style={{ width: '100%', marginBottom: '1vw' }} />
                            </div>
                            }
                        })
                    }
                </div>

            </article>
        </section>
    )
}