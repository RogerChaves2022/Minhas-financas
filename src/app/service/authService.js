import LocalStorageService from "./localstorageservice";

import jwt from "jsonwebtoken"
import ApiService from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = "access_token"

export default class AuthService {
     static isUsuarioAutenticado(){
         const token = LocalStorageService.obterItem(TOKEN);
         if(token == null){
            console.log("token é " + token)
         } else{
            console.log("token é " + token)
         const decodeToken = jwt.decode(token);
         const expiration = decodeToken.exp;
         const isTokenInvalido = Date.now() >= (expiration * 1000)
 
         return !isTokenInvalido;
         }
     }

     static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
        LocalStorageService.removerItem(TOKEN)
     }

     static logar(usuario, token){
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        LocalStorageService.addItem(TOKEN, token)
        ApiService.registrarToken(token);
     }

     static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
     }

     static refreshSession(){
      const token = LocalStorageService.obterItem(TOKEN)
      const usuario = this.obterUsuarioAutenticado
      this.logar(usuario, token)
      return usuario;
     }
}