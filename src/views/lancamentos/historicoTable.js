import React from "react";

export default props => {


    const cards = props.historicos.map(historico =>{
        return(
                <div className="box btn btn-info">
                    <h3><i class="pi pi-calendar"></i>{historico.mes == 1 ? "Janeiro" : ""}
                    {historico.mes == 2 ? "Fevereiro"  : ""}
                    {historico.mes == 3 ? "Março"  : ""}
                    {historico.mes == 4 ? "Abril"  : ""}
                    {historico.mes == 5 ? "Maio"  : ""}
                    {historico.mes == 6 ? "Junho"  : ""}
                    {historico.mes == 7 ? "Julho" : ""}
                    {historico.mes == 8 ? "Agosto" : ""}
                    {historico.mes == 9 ? "Setembro" : ""}
                    {historico.mes == 10 ? "Outubro" : ""}
                    {historico.mes == 11 ? "Novembro" : ""}
                    {historico.mes == 12 ? "Dezembro" : ""}</h3>
                <span><i class="pi pi-wallet"></i>Receitas: R$ {historico.receitas}</span><br/>
                <span><i class="pi pi-shopping-cart"></i>  Despesas: R$ {historico.despesas}</span><br/>
                <span><i class="pi pi-chart-line"></i>Total: R$ {historico.total}</span><br/></div>
        )
    })

    return(
            <div>
                {cards}
            </div>
                
    )
}