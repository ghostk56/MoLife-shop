package com.tibame.tga105.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tibame.tga105.shop.domain.AnimalType;

@Repository
public interface AnimalTypeRepository extends JpaRepository<AnimalType, Integer> {

}