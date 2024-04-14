import React, { useEffect, useState } from 'react'
import { Container, Owner, Loading, IssuesList, PageActions, ButtonsFilterState } from "./style"
import { useParams, Link } from "react-router-dom";
import api from '../../services/api';
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function Repositories({ match }) {
  const { repository } = useParams();
  const [repositories, setRepositories] = useState({})
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [ChangeState, setChangeState] = useState([
    { state: 'all', label: 'all', active: true },
    { state: 'open', label: 'open', active: false },
    { state: 'closed', label: 'closed', active: false },
  ])

  const [filterIndex, setFilterIndex] = useState(0)
  useEffect(() => {

    async function load() {
      const nameRepository = repository;

      const [repositoriesData, issuesData] = await Promise.all([
        api.get(`/repos/${nameRepository}`),
        api.get(`/repos/${nameRepository}/issues`, {
          params: {
            state: ChangeState.find(f => f.active).state,
            per_page: 5
          }
        })
      ])
      setRepositories(repositoriesData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }


    load()
  }, [repository])

  useEffect(() => {

    async function loadIssues() {
      const nameRepository = repository;
      const response = await api.get(`/repos/${nameRepository}/issues`, {
        params: {
          state: ChangeState[filterIndex].state,
          page,
          per_page: 5,
        }
      })
      setIssues(response.data)
    }
    loadIssues()

  }, [ChangeState, filterIndex, repository, page])
  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)

  }
  if (loading) {
    return (
      <Loading>
        <h1>Loading...</h1>
      </Loading>
    )
  }
  function handleFilter(i) {
    setFilterIndex(i)
  }
  return (
    <Container>
      <Link to={'/'}>
        <IoMdArrowBack size={30} color='#0D2636'></IoMdArrowBack >
      </Link>
      <Owner>
        <img src={repositories.owner.avatar_url} alt={repositories.owner.login} />
        <h1>{repositories.name}</h1>
        <p>{repositories.description}</p>
      </Owner>
      <ButtonsFilterState active={filterIndex}>
        {ChangeState.map((filters, index) => (
          <button
            type='button'
            key={filters.label}
            onClick={() => handleFilter(index)}
          >
            {filters.label}
          </button>
        ))}
      </ButtonsFilterState>
      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>


      <PageActions>
        <button disabled={page < 2}>
          <MdOutlineArrowBackIos size={30} color='#0D2636' onClick={() => handlePage('back')} />
        </button>
        <button>
          <MdOutlineArrowForwardIos size={30} color='#0D2636' onClick={() => handlePage('next')} />

        </button>
      </PageActions>
    </Container>
  )
}
