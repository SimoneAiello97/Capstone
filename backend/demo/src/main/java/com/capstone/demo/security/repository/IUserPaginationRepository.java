package com.capstone.demo.security.repository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.capstone.demo.security.entity.User;

public interface IUserPaginationRepository extends PagingAndSortingRepository<User, Long> {

}
