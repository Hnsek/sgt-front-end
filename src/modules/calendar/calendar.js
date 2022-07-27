import React, { useState, useEffect, useRef } from 'react'
import './calendar.css'
import DayDataUser from './components/user/dayData'
import DayDataAdmin from './components/adm/dayData'

import { Link } from 'react-router-dom'


const fetchData = (form) => {
    return fetch('http://localhost/SGST/back-end/index.php?route=findTrips', {
                method: 'POST',
                body: form,
            })
}

const DaysOfWeed = ['Domingo', 'Segunda', "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
const Months = ['Janeiro', 'Fevereiro','Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro','Dezembro']

export default ({ authenticated }) => {
    const [days, setDays] = useState({
        dayStart: '',
        monthSize: 0,
        monthNumber: 0,
        year: 0,
        monthDays: [],
        markedTrips:[]

    })
    const [informationDaysVisible, setInformationDaysVisible] = useState(false)
    const [informationDay, setInformationDays] = useState([])

    const [month, setMonth] = useState((new Date().getMonth()) + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [optionButton, setOptionButton] = useState(false)
    const [fetchError, setFetchError] = useState(false)


    const generateDaysButtons = (activeButton, numberDay) => {


        if (!activeButton) {
            return <button onClick={() => {
                if (authenticated) {

                    setInformationDaysVisible(numberDay < 10 ? `0${numberDay}` : numberDay.toString())
                }
            }}
                style={authenticated ? { cursor: 'pointer' } : {}}
                className='daysButtons'>{numberDay}</button>
        }
        else {
            return <button onClick={() => {
                setInformationDaysVisible(numberDay < 10 ? `0${numberDay}` : numberDay.toString())
                // searchTrips(numberDay < 10 ? `0${numberDay}` : numberDay.toString())
            }} className='daysButtons blueButton'  >
                {numberDay}
                <p className='saberMais'>Saber mais</p>
            </button>
        }
    }



    const getInformationMonth = async (year, month) => {
        try {
            const form = new FormData();

            form.append('month', month);
            form.append('year', year);


            const result = await fetchData(form)
            let date = new Date(year, month, 0)

            const resultado = await result.json()


            let monthDays = []
            
            for (let i = 1; i < date.getDate() + 1; i++) {

                let dayString = i < 10 ? `0${i}` : i.toString()

                let searchJSON = resultado.filter( json => json.day === dayString)


                if(!searchJSON[0]){
                    monthDays.push(generateDaysButtons(false,i))
                }
                else{
                    monthDays.push(generateDaysButtons(true,i))
                }
                
            }
            return {
                dayStart: (new Date(year, month - 1, 1).getDay()) + 1,
                monthSize: date.getDate(),
                monthNumer: month,
                year: year,
                monthDays: monthDays,
                markedTrips:resultado

            }
        }
        catch(erro) {
            setFetchError(true)
        }


    }

    const refreshDays = (year, month) => {

        console.log("Ano: ", year)
        console.log("Mês: ", month)

        getInformationMonth(year.toString(), month < 10 ? `0${month}` : month.toString() ).then((daysInformations) => {
            setInformationDays(daysInformations.markedTrips)
            setDays(daysInformations)
        })
    }

    const changeMonth = (value) => {
        let changedMonth = month
        let changedYear = year

        
        if(month === 12 && value > 0){
            changedYear = year + 1
            changedMonth = 1

            setYear(year + 1)
            setMonth(1)
        }
        else if(month === 1 && value < 0){
            changedYear = year - 1
            changedMonth = 12
            
            setYear(year - 1)
            setMonth(12)
        }
        else{
            changedMonth = month + value 

            setMonth(month + value)
        }
        

        refreshDays(changedYear, changedMonth)
        
    }

    useEffect(async () => {
        
        refreshDays(year, month)
        
    }, [])
    return (
        <section className='containerCalendar'>
            {
                informationDaysVisible && (authenticated ?
                    <DayDataAdmin
                        setInformationDays={setInformationDays}
                        setInformationDaysVisible={setInformationDaysVisible}
                        informationDay={informationDay}
                        day={informationDaysVisible}
                        month={month}
                        year={year}
                        refreshDays={refreshDays}
                    />
                    :
                    <DayDataUser
                        setDays={setDays}
                        setInformationDaysVisible={setInformationDaysVisible}
                        informationDay={informationDay}
                        setInformationDays={setInformationDays}
                        day={informationDaysVisible}
                    />
                )
            }
            <section className='calendar'>
                <article className='headerCalendar'>
                    <button className='arrowButtonsCalendar' onClick={()=>changeMonth(-1)}></button>
                    <h1 className='month'>{Months[month - 1]} de {year}</h1>
                    <button className='arrowButtonsCalendar' onClick={()=>changeMonth(+1)}></button>
                </article>
                <article className='containerDays'>
                    {
                        DaysOfWeed.map(dayOfWeek => <div className='daysOfWeek'>{dayOfWeek}</div>)
                    }
                    {
                        days.dayStart != 0 && <div style={{ gridColumnStart: 0, gridColumnEnd: days.dayStart }}></div>
                    }

                    {
                        days.monthDays.map(buttons => buttons)    
                    }
                </article>
            </section>
            <section className="legends">

                <article className='optionsContainer'>
                    {
                        !optionButton ?
                            <button className='optionEnable' onClick={() => setOptionButton(ob => !ob)}></button>
                            :
                            <div className='options'>
                                <div className='headerButtonsOptions'>
                                    <button className='closeOptionButtons' onClick={() => {
                                        const optionContainer = document.getElementsByClassName('options')[0]
                                        optionContainer.style.width = '0'
                                        optionContainer.style.height = '0'
                                        setTimeout(() => setOptionButton(ob => !ob), 100)


                                    }}>X</button>
                                </div>
                                {
                                    !authenticated &&
                                    <Link className='optionButtons' to={'/calendario'}>Fazer Login</Link>
                                }
                                {/* <Link className='optionButtons' to={'/calendario'}>Agenda</Link> */}
                                {
                                    authenticated &&
                                    <Link className='optionButtons' to={'/relatorios-veiculares'}>Relatórios veiculares</Link>
                                }
                                {
                                    authenticated &&
                                    <Link className='optionButtons' style={{ marginBottom: '1vw' }} to={'/calendario'}>Sair</Link>
                                }
                            </div>
                    }

                </article>


                <article className='containerLegends'>
                    <div className='boxLegends boxBlue'></div>
                    <p className='textLegends'>Viagens marcadas</p>
                </article>
                <article className='containerLegends'>
                    <div style={{ backgroundColor: 'white' }} className='boxLegends'></div>
                    <p className='textLegends'>Veículos livres</p>
                </article>
            </section>
        </section>
    )
}