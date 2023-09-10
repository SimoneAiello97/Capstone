package com.capstone.demo.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    @Autowired UserService userSvc;
    
    @GetMapping("/users")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
		Page<User> ls = userSvc.getUsersPagination(pageable);
		ResponseEntity<Page<User>> resp = new ResponseEntity<Page<User>>(ls, HttpStatus.OK);
		return resp;
	}

    @DeleteMapping("/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<User> deleteUser(@PathVariable Long id) {
		User user = userSvc.getById(id);
		userSvc.deleteById(id);
		return ResponseEntity.ok(user);
	}
}
