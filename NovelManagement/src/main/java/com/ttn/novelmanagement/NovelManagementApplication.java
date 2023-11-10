package com.ttn.novelmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ttn.service", "com.ttn.controller", "com.ttn.repository", "com.ttn.pojo"})
@EntityScan("com.ttn.pojo")
@EnableJpaRepositories("com.ttn.repository")
public class NovelManagementApplication extends SpringBootServletInitializer{
    public static void main(String[] args) {
        SpringApplication.run(NovelManagementApplication.class, args);
    }
}
