package br.com.provaMaisVida.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import br.com.provaMaisVida.model.DocumentoModel;

public interface DocumentoRepository extends Repository<DocumentoModel, Integer>{

	 void save(DocumentoModel documento);
	 
	 void delete(DocumentoModel documento);
 
	 List<DocumentoModel> findAll();
 
	 DocumentoModel findOne(Integer id);
	
}
