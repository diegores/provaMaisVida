import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
 
import { ConsultaComponent } from './app/documento/consulta/consulta.component';
 
import {CadastroComponent} from './app/documento/cadastro/cadastro.component';
 
import { HomeComponent } from './app/home/home.component';
import { ConsultaTipoComponent } from './app/tipo/consulta/consultaTipo.component';
import { CadastroTipoComponent } from './app/tipo/cadastro/cadastroTipo.component';
 
const appRoutes: Routes = [
    { path: 'home',                    component: HomeComponent },
    { path: '',                        component: HomeComponent },
    { path: 'consulta-documento',         component: ConsultaComponent },
    { path: 'consulta-tipo',         component: ConsultaTipoComponent },
    { path: 'cadastro-documento',         component: CadastroComponent },
    { path: 'cadastro-documento/:codigo', component: CadastroComponent },
    { path: 'cadastro-tipo',         component: CadastroTipoComponent },
    { path: 'cadastro-tipo/:codigo', component: CadastroTipoComponent }
 
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);