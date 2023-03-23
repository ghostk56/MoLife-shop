package com.tibame.tga105.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tibame.tga105.shop.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}