package com.capstone.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.stripe.Stripe;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class Capstone {

	
	public static void main(String[] args) {
		SpringApplication.run(Capstone.class, args);
	}

}
