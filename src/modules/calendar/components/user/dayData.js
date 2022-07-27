import React from 'react'

export default ({ dayInfo, setInformationDaysVisible, informationDay, day }) => {
    return (
        <section className='backgroundInformationDay'>
            <button className='quitInformationDay' onClick={() => setInformationDaysVisible(false)}></button>
            <article id="containerInformationDay" className='containerInformationDay'>
                <div className='headerContainerInformationDay'>
                    <button className='buttonQuiteInformationDay' onClick={() => setInformationDaysVisible(false)}></button>
                </div>
                <div style={{ overflow: 'auto', overflowX: 'hidden', width: '100%' }}>

                    {
                        informationDay.map(infoDay => {
                            if (infoDay.day == day) {

                                return <div style={{ width: '100%' }}>
                                    <span className='itemInfoDay' style={{ marginTop: '1vw' }}>{`Data da viagem: ${infoDay.day}/${infoDay.month}/${infoDay.year}`}</span>
                                    <span className='itemInfoDay'>{`Horário de saída: ${infoDay.time}`}</span>
                                    <span className='itemInfoDay'>{`Veículo: ${infoDay.category}`}</span>
                                    <span className='itemInfoDay'>{`Data do pedido: ${infoDay.requestDate.replace(/-/g, '/')}`}</span>
                                    <span className='itemInfoDay'>{`Motorista: ${infoDay.driver}`}</span>
                                    <span className='itemInfoDay'>{`Destino: ${infoDay.destiny}`}</span>
                                    <span className='itemInfoDay'>{`Data prevista de volta: ${infoDay.dateBack} `}</span>
                                    <span className='itemInfoDay'>{`Horário previsto de volta: ${infoDay.timeback} `}</span>
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