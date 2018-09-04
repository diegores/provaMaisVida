/**
 * 
 */
package br.com.provaMaisVida.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

/**
 * @author Diego.Esteves
 *
 */

@Table(name = "tb_documento")
@Entity
public class DocumentoModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_documento")
	private Integer id;

	@Column(name = "ds_nome")
	private String nome;

	@Column(name = "ds_documento")
	private String dsDocumento;

	@Column(name = "num_documento")
	private Integer numeroDocumento;

	@Column(name = "id_tipo")
	@JoinColumn(name = "idtipo")
	private Integer idtipo;

	public Integer getIddocumento() {
		return id;
	}

	public void setIddocumento(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getNumeroDocumento() {
		return numeroDocumento;
	}

	public void setNumeroDocumento(Integer numeroDocumento) {
		this.numeroDocumento = numeroDocumento;
	}

	public Integer getIdtipo() {
		return idtipo;
	}

	public void setIdtipo(Integer idtipo) {
		this.idtipo = idtipo;
	}

	public String getDsDocumento() {
		return dsDocumento;
	}

	public void setDsDocumento(String dsDocumento) {
		this.dsDocumento = dsDocumento;
	}

}
