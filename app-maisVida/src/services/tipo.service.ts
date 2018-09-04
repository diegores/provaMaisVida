import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {ConfigService} from './config.service';
import { Tipo } from './tipo';


@Injectable()
export class TipoService {
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/tipo/';
 
        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    /**CONSULTA TODOS OS TIPOS CADASTRADOS */
    getTipos(){        
        return this.http.get(this.baseUrlService).map(res => res.json());
    }
 
    /**ADICIONA UM NOVO TIPO */
    addTipo(tipo: Tipo){
 
        return this.http.post(this.baseUrlService, JSON.stringify(tipo),this.options)
        .map(res => res.json());
    }
    /**EXCLUI UM TIPO */
    excluirTipo(id:number){
 
        return this.http.delete(this.baseUrlService + id).map(res => res.json());
    }
 
    /**CONSULTA UM TIPO PELO ID */
    getTipo(id:number){
 
        return this.http.get(this.baseUrlService + id).map(res => res.json());
    }
 
    /**ATUALIZA INFORMAÇÕES DO TIPO */
    atualizarTipo(tipo:Tipo){
 
        return this.http.put(this.baseUrlService, JSON.stringify(tipo),this.options)
        .map(res => res.json());
    }
}