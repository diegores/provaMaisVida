import { Documento } from './../../../services/documento.';
import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { DocumentoService } from '../../../services/documento.service';
import {Response} from './../../../services/response';
import { Tipo } from '../../../services/tipo';
import { TipoService } from '../../../services/tipo.service';

 
@Component({
    selector: 'app-consulta-tipo',
    templateUrl: './consultaTipo.component.html',
    styleUrls:["./consultaTipo.component.css"]
  })
  export class ConsultaTipoComponent implements OnInit {
 
    private tipo: Tipo[] = new Array();
    private titulo:string;
 
    constructor(private tipoService: TipoService,
                private router: Router){}
 
    ngOnInit() {
 
      /*SETA O TÍTULO */
      this.titulo = "Registros Cadastrados";
 
      /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
      this.tipoService.getTipos().subscribe(res => this.tipo = res);
    }
 
    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(idtipo:number, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
 
        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.tipoService.excluirTipo(idtipo).subscribe(response => {
 
              /**PEGA O RESPONSE DO SERVIÇO */
              let res:Response = <Response>response;
 
              /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.tipo.splice(index,1);
              }
              else{
                /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
                alert(res.mensagem);
              }
          },
          (erro) => {                    
               /*MOSTRA ERROS NÃO TRATADOS */
               alert(erro);
          });        
      }
 
    }
 
    editar(codigo:number):void{
 
      this.router.navigate(['/cadastro-tipo',codigo]);
 
    }
 
  }