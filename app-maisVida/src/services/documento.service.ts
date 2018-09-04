import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


import {ConfigService} from './config.service';
import { Documento } from './documento.';

@Injectable()
export class DocumentoService {
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/documento/';
 
        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    /**CONSULTA TODOS OS DOCUMENTOS CADASTRADOS */
    getDocumentos(){        
        return this.http.get(this.baseUrlService).map(res => res.json());
    }
 
    /**ADICIONA UM NOVO DOCUMENTO */
    addDocumento(documento: Documento){
 
        return this.http.post(this.baseUrlService, JSON.stringify(documento),this.options)
        .map(res => res.json());
    }
    /**EXCLUI UM DOCUMENTO */
    excluirDocumento(id:number){
 
        return this.http.delete(this.baseUrlService + id).map(res => res.json());
    }
 
    /**CONSULTA UM DOCUMENTO PELO ID */
    getDocumento(id:number){
 
        return this.http.get(this.baseUrlService + id).map(res => res.json());
    }
 
    /**ATUALIZA INFORMAÇÕES Do DOCUMENTO */
    atualizarDocumento(documento:Documento){
 
        return this.http.put(this.baseUrlService, JSON.stringify(documento),this.options)
        .map(res => res.json());
    }
}