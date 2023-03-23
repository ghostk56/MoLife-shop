package com.tibame.tga105.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tibame.tga105.shop.domain.ProductCollection;
import com.tibame.tga105.shop.service.ProductCollectionService;

@RestController
@RequestMapping("/productcollections")
public class ProductCollectionController {
	@Autowired
	private ProductCollectionService productCollectionService;

	@GetMapping("/{memberId}")
	public List<ProductCollection> select(@PathVariable Integer memberId) {
	    return productCollectionService.findByMemberId(memberId);
	}

	@PostMapping
	public boolean insert(@RequestBody ProductCollection productCollection) {
		return productCollectionService.save(productCollection);
	}

	@DeleteMapping
	public boolean delete(@RequestBody ProductCollection productCollection) {
		return productCollectionService.delete(productCollection);
	}
}
