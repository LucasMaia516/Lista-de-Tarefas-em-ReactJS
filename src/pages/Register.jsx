import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {

    e.preventDefault()

    if (email !== '' && senha !== '') {

      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {

          navigate('/admin', {replace: true})

          toast.success('Cadastro realizado com sucesso!')
          setEmail('')
          setSenha('')
        })
        .catch((error) => {
          toast.error('Erro ao realizar o cadastro!')
          console.log(error)
        })

    } else {
      alert('Preencha todas os campos!')
    }

  }

  return (

    <div className="container-tarefas">

      <h1>Cadastre-se</h1>

      <span>Crie uma conta</span>

      <form className="form-tarefas" onSubmit={handleRegister}>
        <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button type="submit"> <strong>Cadastrar</strong> </button>

        <Link className="link-tarefas" to="/">
          Já possui uma conta? Faça o login.
        </Link>
      </form>

    </div>
  )

}