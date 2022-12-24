import React from "react";

export default props => {

    const rows = props.lancamentos.map(lancamento =>{
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{lancamento.valor}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                        <button className="btn btn-success"
                                disabled={lancamento.status !== 'PENDENTE'}
                                title="Efetivar" 
                                onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')} 
                                type="button">
                        <i className="pi pi-check mr-2"></i>
                        </button>
                        <button className="btn btn-warning"
                                disabled={lancamento.status !== 'PENDENTE'}
                                title="Cancelar" onClick={e => props.alterarStatus(lancamento, 'CANCELADO')} 
                                type="button">
                        <i className="pi pi-times mr-2"></i>
                        </button>
                        <button type="button"
                                title="Editar"
                                className="btn btn-primary"
                                onClick={e => props.editarAction(lancamento.id)}>
                                    <i className="pi pi-pencil mr-2"></i>
                                </button>
                        <button type="button"
                                title="Deletar"
                                className="btn btn-danger" 
                                onClick={e => props.deletar(lancamento)}>
                                    <i className="pi pi-trash mr-2"></i>
                                </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                      <th scope="col">Descrição</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Mês</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}