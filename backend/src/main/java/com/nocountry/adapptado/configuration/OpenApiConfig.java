package com.nocountry.adapptado.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Adapptado API",
                version = "1.0",
                description = "API for Adapptado application",
                contact = @Contact(
                        name = "Adapptado Team",
                        url = "https://www.adapptado.com"
                )
        ),
        servers = {
                @Server(
                        url = "${app.server.url:http://localhost:8080}",
                        description = "Server URL"
                )
        }
)
public class OpenApiConfig {
    // La configuración se maneja a través de las anotaciones
}