package com.capstone.demo.security.runner;

/* import org.springframework.beans.factory.annotation.Autowired; */
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class AppRun implements CommandLineRunner {
	
	@Override
	public void run(String... args) throws Exception {
		System.out.println("Run...");
		
	}

}
