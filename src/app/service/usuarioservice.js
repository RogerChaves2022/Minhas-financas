import ApiService from "../apiservice";
import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    obterHistorico(id, ano){
        return this.get(`/${id}/historico/${ano}`)
    }

    salvar(usuario){
        return this.post('', usuario)
    }

    validar(usuario) {
        const erros = [];

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório');
        }
        if(!usuario.email){
            erros.push('O campo E-mail é obrigatório');
            }else if(!usuario.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
                erros.push('Informe um email válido.');
            }

            if(!usuario.senha || !usuario.senhaRepeticao){
                erros.push('Digite a senha duas vezes.');
            }else if(usuario.senha !== usuario.senhaRepeticao){
                erros.push('As senhas não coincidem.');
            }

            if(erros && erros.length > 0) {
                throw new ErroValidacao(erros);
            }
    }
}

export default UsuarioService