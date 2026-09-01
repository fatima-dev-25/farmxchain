package com.infosys.farmxchain.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Value("${app.api-url:http://localhost:8080/api/v1}")
    private String apiUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .openapi("3.0.1")
                .info(new Info()
                        .title("FarmXChain API")
                        .version("1.0")
                        .description("API documentation for FarmXChain application"))
                .addServersItem(new Server().url(apiUrl));
    }
}
