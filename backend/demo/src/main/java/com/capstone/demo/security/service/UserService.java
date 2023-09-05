package com.capstone.demo.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.exception.MyAPIException;
import com.capstone.demo.security.repository.IUserPaginationRepository;
import com.capstone.demo.security.repository.IUserRepository;

@Service
public class UserService {

	@Autowired IUserRepository repo;
	@Autowired IUserPaginationRepository pageRepo;
	
	public User getById(Long id) {
		if (repo.existsById(id)) {
			return repo.findById(id).get();			
		}
		else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Utente non trovato!");			
		}
	}

	public User getByUsername(String username) {
	if(repo.existsByUsername(username)){
		return repo.findByUsername(username).get();
	}
	else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username non trovato!");			
		}
	}

	public User getByEmail(String Email) {
	if(repo.existsByEmail(Email)){
		return repo.findByEmail(Email).get();
	}
	else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email non trovata!");			
		}
	}
	
	public Page<User> getUsersPagination(Pageable page) {
		return pageRepo.findAll(page);
	}
	
	public void deleteById(Long id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);			
		}
		else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Cancellazione errata, Utente non trovato!");			
		}
	}
}
