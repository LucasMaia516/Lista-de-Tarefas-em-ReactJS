import "./Admin.css"
import { useState, useEffect } from 'react'
import { auth, db } from '../firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, onSnapshot, query, orderBy, where, deleteDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function Admin() {

  const [tarefas, setTarefas] = useState('')
  const [user, setUser] = useState({})
  const [listaTarefas, setListaTarefas] = useState([])
  const [edit, setEdit] = useState('')

  console.log(user)

  useEffect(() => {

    async function loadTarefas() {

      const userDetail = localStorage.getItem("@detailuser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail)

        const dados = collection(db, 'tarefas')

        const q = query(dados, orderBy('created', 'desc'), where("userUid", "==", data?.uid))

        const buscarTarefas = onSnapshot(q, (snapshot) => {

          let lista = []

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          setListaTarefas(lista)
        })
      }

    }
    loadTarefas()
  }, [])


  async function handleRegister(e) { // Função para registrar as tarefas
    e.preventDefault()


    if (tarefas === ' ') {
      toast.error('Digite sua tarefa...')
      return;
    }

    if (edit?.id) {
      handleUpdateRarefa()
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefas,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {

        toast.success('Tarefa registrada com sucesso!')
        setTarefas('')
      })
      .catch((error) => {
        toast.error('Erro ao registrar tarefa.')
        console.log(error)
      })
  }

  async function handleUpdateRarefa() { // Editar tarefa no banco 

    const docRef = doc(db, 'tarefas', edit?.id)

    await updateDoc(docRef, {
      tarefa: tarefas
    })
      .then(() => {
        toast.success('Tarefa editada com sucesso!')
        setTarefas('')
        setEdit({})
      })
      .catch((error) => {
        toast.error('Ops, erro ao editar tarefa!')
        console.log(error)
        setEdit({})
        setTarefas('')
      })
  }

  async function deslogar() { // Função para deslogar

    await signOut(auth)
      .then(() => {
        toast.success('Saindo da conta...')

      })
      .catch((error) => {
        toast.error('Erro ao deslogar da conta')
        console.log(error)
      })
  }


  async function excluirTarefa(id) { // Função de excluir tarefa

    const docRef = doc(db, 'tarefas', id)

    await deleteDoc(docRef)
      .then(() => {
        toast.success('Tarefa deletada com sucesso!')
      })
      .catch((error) => {
        toast.error('Erro ao deletar tarefa!')
        console.log(error)
      })
  }

  async function editarTarefa(item) {

    setTarefas(item.tarefa)
    setEdit(item)
  }

  return (

    <div className="container-admin">

      <h3 className="h3-container">Bem vindo(a), {user.email}</h3> <br />

      <h1>Minhas tarefas</h1>

      <form className="form-tarefas" onSubmit={handleRegister}>


        <textarea placeholder="Digite sua tarefa..." value={tarefas} onChange={(e) => setTarefas(e.target.value)}>

        </textarea>

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" style={{ backgroundColor: "#6add39" }} type="submit">Atualizar tarefa</button>
        ) : (
          <button className="btn-register" type="submit">Cadastrar tarefa</button>
        )}
      </form>


      {listaTarefas.map((item) => (
        <article key={item.id} className="article-admin">

          <p>{item.tarefa}</p>

          <div>
            <button className="btn-delete" onClick={() => editarTarefa(item)}>Editar</button>
            <button className="btn-delete" onClick={() => excluirTarefa(item.id)} >Excluir</button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={deslogar}>Sair da conta</button>

    </div>

  )

}