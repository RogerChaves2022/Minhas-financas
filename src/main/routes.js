import React from "react";

import Login from '../views/login'
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/main";
import Consultalancamentos from "../views/lancamentos/consultalancamentos";
import CadastroLancamentos from "../views/lancamentos/lancamentocadastro";

import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'

function Rotas(){
        return(
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                    <Route path="/home" component={Home} />
                    <Route path="/consulta-lancamentos" component={Consultalancamentos}/>
                    <Route path="/cadastro-lancamentos" component={CadastroLancamentos} />
                    <Redirect to="/login" />
                </Switch>
                </HashRouter>
            )
}

export default Rotas