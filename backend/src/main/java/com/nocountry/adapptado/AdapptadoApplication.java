package com.nocountry.adapptado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class AdapptadoApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(AdapptadoApplication.class);
		ConfigurableApplicationContext context = app.run(args);
		String[] activeProfiles = context.getEnvironment().getActiveProfiles();
		System.out.println("Active Profiles: " + String.join(", ", activeProfiles));
	}

}
