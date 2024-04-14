import React, { useCallback, useEffect, useState } from 'react'
import { Container, Form, SubmitButton, List, DeleteButton } from './style'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from '../../services/api';
import { Link } from 'react-router-dom'

export default function Main() {
  const [newRepo, setNewRepo] = useState('')
  const [respositories, setRespositories] = useState([])
  const [loading, setLoading] = useState(false)
  const [alerta, setAlert] = useState(null)
  //buscar
  useEffect(() => {
    const repositoryStorage = localStorage.getItem("repository")
    if (repositoryStorage) {
      setRespositories(JSON.parse(repositoryStorage))
    }
  }, [])

  //Salvar alteracoes
  useEffect(() => {
    localStorage.setItem("respository", JSON.stringify(respositories))
  }, [respositories])


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null)
      try {

        if (newRepo.length !== 0) {
          const response = await api.get(`repos/${newRepo}`)
          const hasRepository = respositories.find(r => r.name === newRepo)

          if (hasRepository) {
            throw new Error("Duplicate repository.")
          }
          const data = {
            name: response.data.full_name,
          }
          setRespositories([...respositories, data])
          setNewRepo('')
          console.log(data.name);
        } else {
          alert("You need to indicate a repository.")
        }
      } catch (error) {
        //error message
        setAlert(true)
      } finally {
        setLoading(false)
      }
    }

    submit()
  }, [newRepo, respositories])

  function handledInputChange(e) {
    setNewRepo(e.target.value)
    setAlert(null)
  }
  //Delete repository
  const handleDelete = useCallback((respo) => {
    const find = respositories.filter(r => r.name !== respo)
    setRespositories(find)
  }, [respositories])

  return (
    <Container>

      <h1>
        <FaGithub size={25} />
        Main page
      </h1>
      <Form onSubmit={handleSubmit} error={alerta}>
        <input
          type="text"
          placeholder='Add repositories'
          value={newRepo}
          onChange={handledInputChange}
        />
        <SubmitButton loading={loading ? 1/*true */ : 0/*false*/}>
          {loading ? (
            <FaSpinner color='#fff' size={25} />
          ) : (

            <FaPlus color='#fff' size={25} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {
          respositories.map(respo => (
            <li key={respo.name}>
              <span>
                <DeleteButton onClick={() => handleDelete(respo.name)}>
                  <FaTrash />
                </DeleteButton>
                {respo.name}</span>
              <Link to={`/repositories/${encodeURIComponent(respo.name)}`}>
                <FaBars size={20} />
              </Link>
            </li>
          ))
        }
      </List>
    </Container>
  )
}
