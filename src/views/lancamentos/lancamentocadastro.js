import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectmenu";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageservice";
import * as messages from '../../components/toastr'

class CadastroLancamentos extends React.Component {

    state = {
        id: "",
        descricao: "",
        valor: "",
        ano: "",
        tipo: "",
        status: "",
        usuario: null,
        atualizando: false,
        parcela: ""
    }

    constructor(){
        super()
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service
            .obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando: true})
            })
            .catch(erros =>{
                messages.mensagemErro(erros.response.data)
            })
        }
        
    }


    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, ano, mes, valor, tipo , parcela} = this.state;
        const lancamento = { descricao, ano, mes, valor, tipo, parcela, usuario: usuarioLogado.id};
        
        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
        .salvar(lancamento)
        .then(response =>{
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lancamento cadastrado com sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    atualizar = () => {
        
        const { descricao, ano, mes, valor, tipo, status, usuario, parcela, id } = this.state;

        const lancamento = { descricao, ano, mes, valor, tipo, id, usuario, parcela, status};
        try {
            this.service
            .atualizar(lancamento)
            .then(response =>{
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lancamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        } catch (error) {
            console.log(error);
        }
       
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();
        

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao"
                        type="text" 
                        name="descricao"
                        value={this.state.descricao}
                        onChange={this.handleChange}
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                    <FormGroup id="inputAno" label="Ano: *">
                    <input id="inputAno"
                        name="ano"
                        value={this.state.ano}
                        onChange={this.handleChange}
                        type="text" 
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup id="inputMes" label="Mês: *">
                    <SelectMenu id="inputMes" 
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                                lista={meses} 
                                className="form-control" />
                    </FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup id="inputParcela" label="Parcelas: *">
                    <input id="inputParcela" 
                                name="parcela"
                                value={this.state.parcela}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control" />
                    </FormGroup>
                    </div>
                    <div className="row">
                    <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                    <input id="inputValor"
                        name="valor"
                        value={this.state.valor}
                        onChange={this.handleChange}
                        type="text" 
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                    <SelectMenu id="inputTipo" 
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                lista={tipos} 
                                className="form-control" />
                    </FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: *">
                    <input  type="text" 
                            name="status"
                            value={this.state.status}
                            className="form-control" 
                            disabled></input>
                    </FormGroup>
                    </div>
                     </div>
                     <div className="mt-2">
                        {
                            this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-primary"><i className="pi pi-refresh"></i>Atualizar</button>                                  
                            ) : (
                                <button onClick={this.submit} className="btn btn-success"><i className="pi pi-save"></i>Salvar</button>
                            )

                        }
                    
                    
                    <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger"><i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)