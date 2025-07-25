package br.com.rodrigofroes.backend.configuration.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private SecurityFilterConfiguration securityFilterConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        .requestMatchers(HttpMethod.POST, "/usuario").permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/usuario/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuario/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/usuario/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuario/status/{id}").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/municipio").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/municipio").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/municipio/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/municipio/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/municipio/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/municipio/status/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/municipio/web/listar").permitAll()

                        .requestMatchers(HttpMethod.GET, "turismo-experiencia").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "turismo-experiencia").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "turismo-experiencia/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "turismo-experiencia/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "turismo-experiencia/status/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "turismo-experiencia/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/turismo-experiencia/web/listar").permitAll()

                        .requestMatchers(HttpMethod.GET, "/sabor-cultura").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/sabor-cultura").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/sabor-cultura/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/sabor-cultura/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/sabor-cultura/status/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/sabor-cultura/web/listar").permitAll()

                        .requestMatchers(HttpMethod.GET, "/evento").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/evento").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/evento/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/evento/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/evento/status/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/evento/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/evento/categorias").hasRole("ADMIN")
                        
                        .requestMatchers(HttpMethod.GET, "/evento/web/listar/destaque").permitAll()
                        .requestMatchers(HttpMethod.GET, "/evento/web/listar").permitAll()

                        .requestMatchers(HttpMethod.GET, "/newsletter").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/newsletter/status/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/newsletter/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/newsletter").permitAll()
                        
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilterConfiguration, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://site.localhost", "http://admin.localhost" ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
