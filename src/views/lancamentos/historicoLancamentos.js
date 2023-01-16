import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import LocalStorageService from "../../app/service/localstorageservice";
import UsuarioService from '../../app/service/usuarioservice'
import * as messages from '../../components/toastr'
import HistoricoTable from "./historicoTable";

class HistoricoLancamentos extends React.Component{
    state = {
        ano: "",
        historicos: []
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }


    submit = () => {

        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do campo ano é obrigatório.")
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');


        this.service.obterHistorico( usuarioLogado.id , this.state.ano )
            .then( resposta => {
                const lista = resposta.data;
                if(lista.length <1 ){
                    messages.mensagemAlerta("Nenhum resultado encontrado!")
                }
                this.setState({ historicos: lista})
            }).catch(error =>{
                    console.error(error.response)
                })
    }

    render(){
        return(
            <Card title="Linha do Tempo - Cronograma">
                <div className="row">
                    <div className="col-md-3">
                    <FormGroup id="inputAno" label="Ano: *">
                    <input id="inputAno"
                        name="ano"
                        value={this.state.ano}
                        onChange={this.handleChange}
                        type="text" 
                        className="form-control"></input>                        
                    </FormGroup>
                    </div>
                    <div className="col-md-3 mt-4"><button onClick={this.submit} className="btn btn-success"><i className="pi pi-search"></i>Buscar</button></div>
                </div>

                
                <div>
                    <HistoricoTable historicos={this.state.historicos}/>
                </div>
                
            </Card>
        )
    }
}

export default withRouter(HistoricoLancamentos)