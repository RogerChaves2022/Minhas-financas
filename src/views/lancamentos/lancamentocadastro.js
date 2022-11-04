import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

class CadastroLancamentos extends React.Component {
    render(){
        return (
            <Card>
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao"
                        type="text" 
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                    <input id="inputAno"
                        type="text" 
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                    <input id="inputMes"
                        type="text" 
                        className="form-control"></input>
                    </FormGroup>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)