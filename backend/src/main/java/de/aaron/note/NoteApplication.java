package de.aaron.note;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@ComponentScan("de.aaron.note")
public class NoteApplication {
	
	// private static final Logger log = LoggerFactory.getLogger(NoteApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(NoteApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// https://spring.io/guides/gs/rest-service-cors/#global-cors-configuration
				registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("*");
		        // registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET, POST, OPTIONS, HEAD").maxAge(10000).allowedHeaders("*");

			}
		};
	}
	
}
