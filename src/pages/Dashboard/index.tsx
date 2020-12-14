import React, {useState, FormEvent, useEffect} from 'react';
/*20º*/ import {Link} from 'react-router-dom';
import {Title, Form, Repositories, Error} from './styles';
import {FiChevronRight} from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/images/logotipo.svg';
//import Repository from '../Repository';

// Essa interface é a definição dos tipos que existe na api publica do github
/*9º*/interface Repository {
  full_name: string;
  description: string
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  /*3º*/const [newRepo, setNewRepo] = useState(''); // Estado para armazenar o valor do input
  /*5º*/ /*19º*/const [repositories, setRepositories] = useState<Repository[]>(() => {
  const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

  if (storageRepositories)  {
    return JSON.parse(storageRepositories);
  }return [];
});
  /*12º*/ const [inputError, setInputError] = useState('')

  /*18º*/ useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  /*1º*/async function hundleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
    //Adição de um novo repositŕoio
    //Consumir a API do Github buscado
    //Salvar novo respositório no estado
    /* (event: FormEvent<HTMLFormElement>) junto com o event.preventDefault();
    Previne o evento de recarregar a página sempre quando clica, nesse caso teve essa extenção maior porque o evento é no form, por isso, teve que importar o FormEvent tambem. Então foi passado um uma tipagem pronta nativo para formulário.
    */
   // async é significa função assicrona é necessário para trabalhar com a API.
   // Quando a função passa a ser async é necessaŕio usar o Promise<void>

    /*2º*/event.preventDefault();

    /*5º*/ //Vai armazenar os repositórios usando o useState. Foi adicionado o <Repository[]> após o usState porque ele ta pegando o array de repositórios que o setRepositories ta recebendo.

    /*13º*/ if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
     return;
}
 /*14º*/  try {
      // Chamada da API
   /*4º*/ const response = await api.get<Repository>(`repos/${newRepo}`);

    /*6º*/const repository = response.data; // repository está recebendo a informação do response, o response ta armazebando as informações da api. Já o data, seria as informações dos objetos.

    //A API ta pegando os dados que ta armazenado em: ${newRepo} para assim ser inserido na pesquisa
    // api.get(`repos/${newRepo}`) Em repos/ é a prévia fixa da URL de pesquisa
    // O const repository são os dados que precisam ser adicionados ao fim da lista (Próxima etapa do projeto)
    // Foi adicionado <Repository>, para pegar as informações baseadas na tipagem definina na interface Repository

    /*7º*/setRepositories([...repositories, repository]);
    /*11º*/ //Após clicar em pesquisar, o valor de pesquisa inserido no input permanece sendo exibido, para poder limpar e assim, ter uma expeciência mais agradavel de incluir uma nova pesquisa (valor), para isso, precisa chamar o estado nessa função. setNewRepo('');

    setNewRepo('');
    setInputError('');
  } catch(error) {
    setInputError('O autor/nome do repositório não existe');
  }
  }

  /* No input, o valor que vai receber é o value={newRepo}
  Quando o usuário altera o valor desse input, recebe um evento onChange={(e) => setNewRepo(e.target.value)}
  */

  /*10º*/ //Incluir as tipagens nas informações.

  //No uso do map, foi adicionado o estado repositories que está recebendo um array e definindo um parametro, e no primeiro intem é importanten adicionar uma Key=


/*** Tratamento de erros ***/

/*12º*/ /*
const [inputError, setInputError] = useState('') Precisa ser criado um estado para o tratamento de erros. Foi criado como uma string ('') e não com True ou False porque pode ter mais de uma mensagem de erro.

/*13º*/ /*
  No inicio da função, será adicionado uma verificação, se o conteúdo da varivavel newRepo está vazio, o sinal de negação antes dele ja vai verificar. Então, newRpo vai receber o ustate setInputError com a seguinte mensagem... ('Digite o autor/nome do repositório')
*/

/*14º*/ /*
  Todos os itens como:
  -> const response = await api.get<Repository>(`repos/${newRepo}`);
  -> const repository = response.data;
  -> setRepositories([...repositories, repository]);
  -> setNewRepo('');

  Serão alocados para dentro de um Try. Se, a vaerificação do response falhar, será apresentado o erro em Catch. No caso optei em deixar catch(error) {seInputError('Erro na busca por esse repositório')}
*/

/*15º*/ /*
  Foi criado um componente de estilo chamado {inputError && <Error>{inputError}</Error> }. Isso siginifca que se a variavel inputError ta preenchida, é mostrado o imput com a mensagem de erro e o component Error vai estilizar para ser exebido assim. O componente Error foi criado no style do componente Dashboard.
*/

/*16º*/ /*
  O problema agora é que o erro ele não deixa de exibir após incluir um valor válido, o mesmo problema que teve para limpar o valor após digitado na pesquisa. Para isso não ocorrer, precisa adicionar o estado com uma string vazia.
*/

/*17º*/ /*
  hasError={!!inputError} está recebendo a varivel/estado vazia. hasError não será reconhecido facilmente no form, por isso precisa ser aplicado diretamente na estilização do form uma prop pra ele. export const Form = styled.form<FormProps>`` e com isso criado uma interface chamada...

  interface FormProps {
  hasError: boolean;
  }

Também precisa importar o {css}
import styled, {css} from 'styled-components';

Para permitir o uso de CSS sentro das aspas ``, se não, não reconheceria o estilo dentro, ele entenderia como um texto simples.

Agora é possivel criar um estilo especifico sempre que o status de erro aparecer conforme o objetivo dessa variavel.

*/

/*** LocalStorage ***/
/*O objetivo do LocalStorage será para armazenar algum dado de uma aplicação.
*/

/*18º*/ /*

  Uma boa utilidade será o useEffect. Nesse caso ele vai permitir que disparamos uma função sempre que uma varivel mudar.

  Primeiro será importando import React, {useState, FormEvent, useEffect} from 'react';

  Depois a declaração será colocada acima da função assicrona da seguinte forma.

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', repositories);
  }, [repositories]);

  Onde ta '@GithubExplorer:repositories' foi a nomeação escolhida para identificar qual a aplicação que está sendo armazenada no Local Storange, é adicionado em uma string textual. Só que o LocalStorage não aceira Array e que o argumento do tipo repositories não possivel converter para string, para isso, é necessário converter o tipo para string: JSON.stringify(repositories)

   useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  Agora os dados relacionado ao repositório será armezenado no LocalStorage

*/

/*19º*/ /*
Os repositórios após a pesquisa do repositório precisa manter exposto ao atualizar a página, até o momento ao atualizar a página não mantem as ultimas pesquisas feitas.

Como o LocalStorage por ser uma API sicrona e é uma api que não precisa usar o async await (função assicrona), é possível trabalhar no lugar do array do repositório, usar uma função e dentro dessa função é possível escrever qualquer coisa, nesse caso, vai pegar os repositórios que estão no localstorage @GithubExplorer:repositories e vai ser passado a seguinte tomada de decisão:

const [repositories, setRepositories] = useState<Repository[]>(() => {
  const storageRepositories = localStorage.getItem('@GithubExplorer:repositories'); //Pegando o valor do LocalStorage

  if (storageRepositories)  {
    return JSON.parse(storageRepositories); // Precisa agora desconverter de string para Array, por isso o uso do JSON.parse() e retornar como Array.
  } return []; // Caso contrário return []; retorna um array vazio se não econtrar nada no LocalStorage.
});
*/

/*20º*/ /*
  LINK react-router-dom

  O Router Dom, tem um LINK nativo que evita o carregamento da página ao clicar, diferente do <a> nativo.

  OBS: É recomendável usar o <a> para links externos da aplicação e o LINK do Router para rotas iternas da aplicação.

  É importante antes de tudo... import {Link} from 'react-router-dom';

  A rota de link ja definida aqui, o nome na pesquisa ${repository.full_name}
  <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>

  No arquivo routes/index

  <Route path="/repositories" component={Repository}/> será alterado para
  <Route path="/repositories/:repository+" component={Repository}/>

  o termo /:repository a rota vai entender como parametro da rota que foi definido, mas... caso o nome tenha um /, precisa adicionar um sinal de +
*/



  return (
    <>
    <img src={logoImg} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>

    <Form hasError={!!inputError} onSubmit={hundleAddRepository}>
      <input placeholder="Digite o nome do repositório" value={newRepo} onChange={(e) => setNewRepo(e.target.value)}/>
      <button type="submit">
        Pesquisar
      </button>
    </Form>
  {inputError && <Error>{inputError}</Error> }
    <Repositories>
     {repositories.map(repository => (
        <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <div>
     <strong>{repository.full_name}</strong>
      <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20}/>
      </Link>
     ))}
    </Repositories>
    </>
  )
}

export default Dashboard;
