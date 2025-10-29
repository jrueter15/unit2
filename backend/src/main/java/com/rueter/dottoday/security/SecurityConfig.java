package com.rueter.dottoday.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.Customizer;
// currently unused
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;

@Configuration
public class SecurityConfig {

  private final JwtRequestFilter jwtRequestFilter;

  @Autowired
  public SecurityConfig(@Lazy JwtRequestFilter jwtRequestFilter) {
    this.jwtRequestFilter = jwtRequestFilter;
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
          // Allow specific POST requests
          .requestMatchers(HttpMethod.POST, "/users/login").permitAll()
          .requestMatchers(HttpMethod.POST, "/users/register").permitAll()

          // Require authentication for all other requests
          .anyRequest().authenticated()
      )
      // Use stateless session
          .sessionManagement(session -> session
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      // Enable CORS
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      // Disable CSRF
      .csrf(csrf -> csrf.disable())
      // Disable form login (solving/preventing my 403 on login endpoint)
      .formLogin(form -> form.disable())
      // Disable HTTP Basic (solving/preventing my 403 on login endpoint)
      .httpBasic(basic -> basic.disable())
      // Add JWT filter before UsernamePasswordAuthenticationFilter
      .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  UserDetailsService userDetailsService(DataSource dataSource) {
    return new JdbcUserDetailsManager(dataSource);
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
}