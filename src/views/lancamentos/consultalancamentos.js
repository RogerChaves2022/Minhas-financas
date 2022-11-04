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
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})

    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1)
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            messages.mensagemSucesso("Lançamento deletado com sucesso!")
        }).catch(error => {
            messages.mensagemErro("Ocorreu um erro ao tentar deletar!")
        })
    }

    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancela" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        );

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
                                                deletar={this.abrirConfirmacao}
                                                editarAction={this.editarAction}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                <Dialog header="Header" 
                visible={this.state.showConfirmDialog} 
                style={{ width: '50vw' }}
                footer={confirmDialogFooter}
                modal={true} 
                onHide={() => this.setState({showConfirmDialog: false})}>
                <p>Confirma a exclusão deste lançamento</p>
</Dialog>
                </div>
            </Card>

        )
    }

}

export default withRouter(ConsultaLancamentos);