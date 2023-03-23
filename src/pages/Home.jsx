import "./Home.css"
import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Home() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')


  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' && senha !== '') {

      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {

          navigate('/admin', { replace: true })

          toast.success('Seja bem-vindo(a)!!!')
          setEmail('')
          setSenha('')
        })
        .catch((error) => {
          toast.error('Erro ao acessar a conta!')
          console.log(error)
        })

    } else {
      toast.error('Preencha todas os campos!')
    }

  }

  return (
    <div>
      <div className="container-tarefas">

        <h1>Lista de Tarefas</h1>

        <span>Gerencie sua agenda de forma fácil.</span>

        <form className="form-tarefas" onSubmit={handleLogin}>
          <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <button type="submit"> <strong>Acessar sua conta</strong> </button>

          <Link className="link-tarefas" to="/register">
            Não possui uma conta? Cadastre-se.
          </Link>
        </form>


      </div>
      <footer>
        Site criado por, <a href="https://github.com/LucasMaia516" target="_blank" rel="noreferrer">LucasMaia.</a>
      </footer>
    </div>


  )

}