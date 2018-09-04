import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



import { Tipo } from './../../../services/tipo';
import { Documento } from '../../../services/documento.';
import { TipoService } from './../../../services/tipo.service';
import { DocumentoService } from '../../../services/documento.service';
import {Response} from './../../../services/response';
 
@Component({
    selector: 'app-cadastro-documento',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })
  export class CadastroComponent implements OnInit {
 
    private titulo:string;
    private documento:Documento = new Documento();
    private tipo:Tipo = new Tipo();
 
    constructor(private documentoService: DocumentoService,
                private tipoService: TipoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
 
      this.activatedRoute.params.subscribe(parametro=>{
 
        if(parametro["id"] == undefined){
 
          this.titulo = "Novo Cadastro de Documento";
          this.tipoService.getTipos().subscribe(res => this.tipo = res);
        }
        else{
 
          this.titulo = "Editar Cadastro de Documento";
          this.documentoService.getDocumento(Number(parametro["id"])).subscribe(res => this.documento = res);
          this.tipoService.getTipo(Number(parametro[this.documento.idTipo])).subscribe(res => this.tipo = res);
        }
 
 
      });      
    }
 
    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {
 
      /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
      if(this.documento.id == undefined){
        
        if(this.validarCampos() == true){
            
          /*CHAMA O SERVIÇO PARA ADICIONAR UM NOVO DOCUMENTO */
          this.documentoService.addDocumento(this.documento).subscribe(response => {
  
            //PEGA O RESPONSE DO RETORNO DO SERVIÇO
            let res:Response = <Response>response;
  
            /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
            E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
            if(res.codigo == 1){
              alert(res.mensagem);
              this.documento = new Documento();
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
        }
      }
      else{
 
        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.documentoService.atualizarDocumento(this.documento).subscribe(response => {
 
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response>response;
 
         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
        if(res.codigo == 1){
          alert(res.mensagem);
          this.router.navigate(['/consulta-documento']);
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

    private validarCampos():boolean{
      var retorno = true;
      if(this.documento.dsDocumento == undefined || this.documento.dsDocumento == ""){
          alert("O campo que Descricação deve ser preenchido!");
          retorno = false;
      } else if(this.documento.nome == undefined || this.documento.nome == ""){
          alert("O campo que nome deve ser preenchido!");
          retorno = false;
      }else if(this.documento.numeroDocumento == undefined){
        alert("O campo que número do documento deve ser preenchido!");
        retorno = false;
      }else if(this.documento.idTipo != undefined){
        alert("Tipo do Documento é campo obrigatório!");
        retorno = false;
      }
      return retorno;
    }
 
  }
