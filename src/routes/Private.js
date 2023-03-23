import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'


export default function Private({ children }) {

  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {

    async function chekLogin() {

      const usuario =  onAuthStateChanged(auth, (user) => {

        if(user){

          console.log(user)
          const userData = {
            uid: user.uid,
            email: user.email,
            
          }

          localStorage.setItem("@detailuser", JSON.stringify(userData))
          setLoading(false)
          setSigned(true)

        } else {
          setLoading(false)
          setSigned(false)
        }

      })

    }
    chekLogin()

  }, [])

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    return(
      <Navigate to="/"/>
    )
  }

  return children;
}