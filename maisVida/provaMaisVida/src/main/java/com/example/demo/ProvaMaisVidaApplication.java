package com.example.demo;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ProvaMaisVidaApplication extends SpringBootServletInitializer {

	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@Override

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ProvaMaisVidaApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(ProvaMaisVidaApplication.class, args);
	}
}
