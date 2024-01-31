package com.ttn.fictionManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ttn.fictionManagement.repository")
public class FictionManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(FictionManagementApplication.class, args);
	}

}
