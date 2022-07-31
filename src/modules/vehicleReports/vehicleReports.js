import React, { useState } from 'react'
import './vehicleReports.css'
import { Link } from 'react-router-dom'

import Transport from './modules/transport/transport'
import OptionsActivedSVG from '../../assets/optionsActived.svg'
import OptionsSVG from '../../assets/options.svg'
export default ({ authenticated }) => {
    const [optionButton, setOptionButton] = useState(false)
    const [activeTab, setActiveTab] = useState('transport')
    const [optionsActived, setOptionsActived] = useState(false)

    return (
        <div id='body'>
            {/* Caso for implementar as demais opções futuramente */}

            {/* <aside className='tabs'>
                <button className='buttonTab'>
                    <span className='buttonTabText'>Transporte</span>

                </button>
                <button className='buttonTab'>
                    <span className='buttonTabText'>Manutenção</span>
                </button>
                <button className='buttonTab'>
                    <span className='buttonTabText'>Combustíveis</span>
                </button>
            </aside> */}
            <section className='primarySection'>

                <article className='optionsContainer'>


                    {
                        !optionButton ?
                            <button onMouseOver={() => setOptionsActived(true)} onMouseOut={() => setOptionsActived(false)} className='optionEnable' onClick={() => setOptionButton(ob => !ob)}>
                                <img src={optionsActived ? OptionsActivedSVG : OptionsSVG} style={{ height: '100%', width: '100%' }} />
                            </button>
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
                                    <Link className='optionButtons' to={'/login'}>Fazer Login</Link>
                                }
                                <Link className='optionButtons' to={'/calendario'}>Agenda</Link>
                                {
                                    authenticated &&
                                    <Link className='optionButtons' style={{ marginBottom: '1vw' }} to={'/calendario'}>Sair</Link>
                                }
                            </div>
                    }

                </article>

                <article className='primaryArticleContainer'>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        {
                            activeTab === 'transport' &&
                            <Transport />
                        }
                    </div>
                </article>
            </section>
        </div>
    )
}