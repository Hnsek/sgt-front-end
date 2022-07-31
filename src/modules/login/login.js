import React, { useState } from 'react'
import './login.css'
import Loading from '../../components/loading'

import Env from '../../Env'

export default ({ setAuthenticated }) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [erro, setErro] = useState(undefined)
    const [loading, setLoading] = useState(false)

    const login = async () => {

        const form = new FormData();

        form.append('user', user)
        form.append('password', password)

        setLoading(true)
        fetch(Env.urlServer + '/index.php?route=signin', {
            // headers: {
            //     'token': ''
            // }, 
            method: 'POST',
            body: form
        })
            .then(async result => {

                setLoading(false)
                let resultado = await result.json()

                if (resultado.resposta === -3) {
                    return setErro('Este usuário já está logado')
                }
                else if (resultado.resposta === -1) {
                    return setErro('Não foi possível realizar a operação')
                }
                else if (resultado.resposta === 0) {
                    return setErro('Dados inválidos')
                }

                setErro(undefined)
                window.localStorage.setItem('accessToken', resultado.resposta)
                setAuthenticated(true)
                // console.log(resultado)
            })

    }

    return (
        <section className='backGround'>
            <article className='containerLogin'>
                <h2 style={{ marginTop: '10%' }}>Login</h2>

                <input value={user} onChange={(e) => setUser(e.target.value)} style={{ marginTop: '20%' }} className='inputs' name="user" placeholder='Usuário' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='inputs' name="password" placeholder='Senha' type={'password'} />

                <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => login()} className='loginButton'>

                    Logar
                </button>
                {
                    erro && <p style={{ color: 'red', fontSize: '90%' }}>{erro}</p>
                }
                {loading &&
                    <div style={{ height: '3vw', width: '3vw', marginTop:'1vw' }}>
                        <Loading />
                    </div>
                }


            </article>
        </section>
    )
}