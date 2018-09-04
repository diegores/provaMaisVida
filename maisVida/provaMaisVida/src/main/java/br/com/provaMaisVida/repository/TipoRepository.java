package br.com.provaMaisVida.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import br.com.provaMaisVida.model.TipoModel;

public interface TipoRepository extends Repository<TipoModel, Integer>{
	
	 void save(TipoModel tipo);
	 
	 void delete(TipoModel tipo);
 
	 List<TipoModel> findAll();
 
	 TipoModel findByIdtipo(Integer id);

}
