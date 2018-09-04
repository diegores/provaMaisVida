package br.com.provaMaisVida.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.provaMaisVida.model.DocumentoModel;
import br.com.provaMaisVida.model.ResponseModel;
import br.com.provaMaisVida.repository.DocumentoRepository;


@CrossOrigin(origins  = "http://localhost:4200")
@RestController
@RequestMapping("/service")
public class DocumentoService {

	@Autowired
	private DocumentoRepository documentoService;

	/**
	 * SALVAR UM NOVO REGISTRO
	 * 
	 * @param documento
	 * @return
	 */
	@RequestMapping(value = "/documento", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel salvar(@RequestBody DocumentoModel documento) {

		try {

			this.documentoService.save(documento);

			return new ResponseModel(1, "Registro salvo com sucesso!");

		} catch (Exception e) {

			return new ResponseModel(0, e.getMessage());
		}
	}

	/**
	 * ATUALIZAR O REGISTRO DE UM DOCUMENTO
	 * 
	 * @param documento
	 * @return
	 */
	@RequestMapping(value = "/documento", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel atualizar(@RequestBody DocumentoModel documento) {

		try {

			this.documentoService.save(documento);

			return new ResponseModel(1, "Registro atualizado com sucesso!");

		} catch (Exception e) {

			return new ResponseModel(0, e.getMessage());
		}
	}

	/**
	 * CONSULTAR TODOS OS DOCUMENTOS
	 * 
	 * @return
	 */
	@RequestMapping(value = "/documento", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody List<DocumentoModel> consultar() {

		return this.documentoService.findAll();
	}

	/**
	 * BUSCAR UM DOCUMENTO PELO ID
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/documento/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody DocumentoModel buscar(@PathVariable("id") Integer id) {

		return this.documentoService.findOne(id);
	}

	/***
	 * EXCLUIR UM REGISTRO PELO ID
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/documento/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel excluir(@PathVariable("id") Integer id) {

		DocumentoModel documentoModel = documentoService.findOne(id);

		try {

			documentoService.delete(documentoModel);

			return new ResponseModel(1, "Registro excluido com sucesso!");

		} catch (Exception e) {
			return new ResponseModel(0, e.getMessage());
		}
	}

}
