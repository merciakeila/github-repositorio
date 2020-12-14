import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import {useRouteMatch, Link} from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';
/*1*/ import api from '../../services/api';

import logoImg from '../../assets/images/logotipo.svg';
import {Header, ReposityInfo, Issues} from './styles';

interface RepositoryParams {
  repository: string
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  id: number
  title: string;
  html_url: string
  user: {
    login: string
  }
}

const Reposity: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null); /*3*/ /*4*/
  const [issues, setIssues] = useState<Issue[]>([]);

  /*
  /*2*/ //Para acessar as issues do repositório precisa acessar no link do github a opção issue. Será armazenado no response e será necessário adicionar no array a varivel params.repository, porque se não adicionar, provavelmente sua variavel será refeita sempre que modificar/atualizar.

  /*
  /*3*/ /*O repositório pode ser repositório ou nulo.
  */

  /*4*/ /*
      const [repository, setRepository] = useState<Repository | null>(null);  Se ele for nulo, e nao repositório, o que ser mostrado na interface?

      Então foi criado a seguinte condição, se tiver repositórion, será exibido a seguinte informação:

      {repository && (
      <ReposityInfo>
      <header>
          <img src={repository?.owner.avatar_url} alt="Mercia Keila"/>
          <div><strong>{params.repository}</strong>
      <p>Descrição do repo</p></div>
      </header>
      <ul>
        <li>
          <strong>1808</strong>
          <span>Stars </span>
      </li>
      <li>
          <strong>48</strong>
          <span>Forks</span>
      </li>
      <li>
          <strong>67</strong>
          <span>Issues abertas</span>
      </li>
      </ul>
    </ReposityInfo>
    )}

  */
  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {  /*2*/
      setRepository(response.data);
    })
  }, [params.repository]);

  useEffect(() => {
    api.get(`repos/${params.repository}/issues`).then(response => {  /*2*/
      setIssues(response.data);
    })
  }, [params.repository]);

  return (
    <>
    <Header>
    <img src={logoImg} alt="Github Explorer" />
    <Link to="/">
      <FiChevronLeft size={16} />
      Voltar
    </Link>
    </Header>
    {repository && (
      <ReposityInfo>
      <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
          <div><strong>{repository.full_name}</strong>
          <p>{repository.description}</p></div>
      </header>
      <ul>
        <li>
          <strong>{repository.stargazers_count}</strong>
          <span>Stars</span>
      </li>
      <li>
          <strong>{repository.forks_count}</strong>
          <span>Forks</span>
      </li>
      <li>
          <strong>{repository.open_issues_count}</strong>
          <span>Issues abertas</span>
      </li>
      </ul>
    </ReposityInfo>
    )}
    <Issues>
     {
       issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
        <div>
         <strong>{issue.title}</strong>
        <p>{issue.user.login}</p>
        </div>
        <FiChevronRight size={20}/>
      </a>
       ))
     }
    </Issues>
    </>
  )
}

export default Reposity;
