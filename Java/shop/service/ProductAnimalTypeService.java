package com.tibame.tga105.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga105.shop.domain.AnimalType;
import com.tibame.tga105.shop.repository.AnimalTypeRepository;

@Service
@Transactional
public class ProductAnimalTypeService {

	@Autowired
	private AnimalTypeRepository animalTypeRepository;

	public List<AnimalType> selectAll() {
		return animalTypeRepository.findAll();
	}
}
