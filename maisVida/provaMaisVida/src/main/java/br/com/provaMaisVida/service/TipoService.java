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

import br.com.provaMaisVida.model.ResponseModel;
import br.com.provaMaisVida.model.TipoModel;
import br.com.provaMaisVida.repository.TipoRepository;

@CrossOrigin(origins  = "http://localhost:4200")
@RestController
@RequestMapping("/service")
public class TipoService {

	@Autowired
	private TipoRepository tipoService;

	/**
	 * SALVAR UM NOVO REGISTRO
	 * 
	 * @param tipo
	 * @return
	 */
	@RequestMapping(value = "/tipo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel salvar(@RequestBody TipoModel tipo) {

		try {

			this.tipoService.save(tipo);

			return new ResponseModel(1, "Registro salvo com sucesso!");

		} catch (Exception e) {

			return new ResponseModel(0, e.getMessage());
		}
	}

	/**
	 * ATUALIZAR O REGISTRO DE UM TIPO
	 * 
	 * @param tipo
	 * @return
	 */
	@RequestMapping(value = "/tipo", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel atualizar(@RequestBody TipoModel tipo) {

		try {

			this.tipoService.save(tipo);

			return new ResponseModel(1, "Registro atualizado com sucesso!");

		} catch (Exception e) {

			return new ResponseModel(0, e.getMessage());
		}
	}

	/**
	 * CONSULTAR TODOS OS TIPOS
	 * 
	 * @return
	 */
	@RequestMapping(value = "/tipo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody List<TipoModel> consultar() {

		return this.tipoService.findAll();
	}

	/**
	 * BUSCAR UM DOCUMENTO PELO ID
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/tipo/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody TipoModel buscar(@PathVariable("id") Integer id) {

		return this.tipoService.findByIdtipo(id);
	}

	/***
	 * EXCLUIR UM REGISTRO PELO ID
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/tipo/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseModel excluir(@PathVariable("id") Integer id) {

		TipoModel tipoModel = tipoService.findByIdtipo(id);

		try {

			tipoService.delete(tipoModel);

			return new ResponseModel(1, "Registro excluido com sucesso!");

		} catch (Exception e) {
			return new ResponseModel(0, e.getMessage());
		}
	}

}
