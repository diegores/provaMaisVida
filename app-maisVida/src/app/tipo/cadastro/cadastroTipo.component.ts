import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Tipo } from './../../../services/tipo';
import { TipoService } from './../../../services/tipo.service';
import {Response} from './../../../services/response';
 
@Component({
    selector: 'app-cadastro-tipo',
    templateUrl: './cadastroTipo.component.html',
    styleUrls:["./cadastroTipo.component.css"]
  })
  export class CadastroTipoComponent implements OnInit {
 
    private titulo:string;
    private tipo:Tipo = new Tipo();
    
 
    constructor(private tipoService: TipoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
 
      this.activatedRoute.params.subscribe(parametro=>{
 
        if(parametro["idtipo"] == undefined){
 
          this.titulo = "Novo Cadastro de Tipo de Documento";
        }
        else{
 
          this.titulo = "Editar Cadastro de Tipo de Documento";
          this.tipoService.getTipo(Number(parametro["idtipo"])).subscribe(res => this.tipo = res);
        }
 
 
      });      
    }
 
    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {
 
      /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
      if(this.tipo.idtipo == undefined){
          if(this.tipo.dsTipo != "" || this.tipo.dsTipo != undefined){
        /*CHAMA O SERVIÇO PARA ADICIONAR UM NOVO DOCUMENTO */
          this.tipoService.addTipo(this.tipo).subscribe(response => {
  
            //PEGA O RESPONSE DO RETORNO DO SERVIÇO
            let res:Response = <Response>response;
  
            /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
            E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
            if(res.codigo == 1){
              alert(res.mensagem);
              this.tipo = new Tipo();
            }
            else{
              /*
              ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
              NO SERVIDOR (CODIGO = 0)*/
              alert(res.mensagem);
            }
          },
          (erro) => {   
            /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
               EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
              alert(erro);
          });
        }else{
          alert("Todos os campos são obrigatórios e devem ser preenchidos.")
        }
      }
      else{
 
        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.tipoService.atualizarTipo(this.tipo).subscribe(response => {
 
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response>response;
 
         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
        if(res.codigo == 1){
          alert(res.mensagem);
          this.router.navigate(['/consulta-tipo']);
        }
         else{
          /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
          NO SERVIDOR (CODIGO = 0)*/
           alert(res.mensagem);
         }
       },
       (erro) => {                    
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
          alert(erro);
       });
      }
 
    }
 
  }
