import React from "react";

import UsuarioService from "../app/service/usuarioservice";
import { AuthContext } from "../main/authProvider";


class Home extends React.Component{

    state = { 
        saldo: 0 ,
        nome: ""
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    

    componentDidMount(){

        const usuarioLogado = this.context.usuarioAutenticado;
        
        this.setState({nome: usuarioLogado.nome})
        //this.state({nome: this.context.usuarioLogado.nome})

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
        .then( response => {
            this.setState({saldo: response.data})
        }).catch(error =>{
                console.error(error.response)
            })
        
    }

render(){
    return(
        <div className="jumbotron">
    <h1 className="display-3">Bem vindo, { this.state.nome }!</h1>
    <p className="lead">Esse é seu sistema de finanças.</p>
    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
    <hr className="my-4" />
    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
    <p className="lead">
      <a className="btn btn-primary btn-lg"
        href="#/cadastro-usuarios"
         role="button">
        <i className="pi pi-user-edit"></i>  Cadastrar Usuário</a>
      <a className="btn btn-danger btn-lg"
      onClick={e => this.props.history.push('/cadastro-lancamentos')} 
      role="button"><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
    </p>
  </div>
    )
}
}

Home.contextType = AuthContext;

export default Home