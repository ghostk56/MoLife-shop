package com.tibame.tga105.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tibame.tga105.shop.domain.Product;
import com.tibame.tga105.shop.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping
	public List<Product> selectAll() {
		return productService.selectAll();
	}

	@GetMapping("/{id}")
	public Product selectId(@PathVariable Integer id) {
		return productService.selectId(id);
	}

	@GetMapping("/spec")
	public List<Product> selectSpec(@RequestParam(required = false) Integer productStatus,
			@RequestParam(required = false) Integer animalTypeId, @RequestParam(required = false) Integer categoryId) {
		return productService.findSpecification(productStatus, animalTypeId, categoryId);
	}

	@PostMapping
	public boolean insert(@RequestBody Product product) {
		return productService.insert(product);
	}

	@PutMapping
	public boolean update(@RequestBody Product product) {
		return productService.update(product);
	}

}