import React from "react";

import Login from '../views/login'
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/main";
import Consultalancamentos from "../views/lancamentos/consultalancamentos";
import CadastroLancamentos from "../views/lancamentos/lancamentocadastro";
import { AuthConsumer } from "./authProvider";

import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){
    return (
        <Route {...props} render ={ (componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={{pathname : "/login", state : {from: componentProps.location}} }/>
                )
            }
        }} />
    )

}

function Rotas(props){
        return(
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={Consultalancamentos}/>
                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
                    <Redirect to="/login" />
                </Switch>
                </HashRouter>
            )
}

export default () =>(
    <AuthConsumer>
        {   (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
) 