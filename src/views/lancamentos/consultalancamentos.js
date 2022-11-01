import React from "react";
import { withRouter } from 'react-router-dom'

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectmenu";
import LancamentosTable from "./lancamentosTable";


import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageservice";
import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do campo ano é obrigatório.")
            return false
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta =>{
                this.setState({ lancamentos: resposta.data})
            }).catch( error => {
                messages.mensagemErro(error)
            })
    }

    editarAction = (id) => {
        console.log(id)
    } 

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)
            lancamentos.splice(index, 1)
            this.setState(lancamentos)
            messages.mensagemSucesso("Lançamento deletado com sucesso!")
        }).catch(error => {
            messages.mensagemErro("Ocorreu um erro ao tentar deletar!")
        })
    }

    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consulta Lançamentos">
                <div  className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                    id="inputAno"
                                    className="form-control"
                                    value={this.state.ano}
                                    placeholder="Ex: 2022"
                                    onChange={e => this.setState({ano: e.target.value})} />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mes:">
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            className="form-control" 
                                            lista={meses} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição:">
                            <input type="text"
                                    id="inputDescricao"
                                    className="form-control"
                                    value={this.state.descricao}
                                    placeholder="Ex: Fatura"
                                    onChange={e => this.setState({descricao: e.target.value})} />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento:">
                                <SelectMenu id="inputTipo"
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            className="form-control" 
                                            lista={tipos} />
                            </FormGroup>
                            <br/>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                                deletar={this.deletar}
                                                editarAction={this.editarAction}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</Dialog>
                </div>
            </Card>

        )
    }

}

export default withRouter(ConsultaLancamentos);