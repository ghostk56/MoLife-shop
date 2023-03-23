package com.tibame.tga105.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tibame.tga105.shop.domain.ProductCart;
import com.tibame.tga105.shop.service.ProductCartService;

@RestController
@RequestMapping("/productcarts")
public class ProductCartController {
	@Autowired
	private ProductCartService productCartService;

	@GetMapping("/{memberId}")
	public List<ProductCart> select(@PathVariable Integer memberId) {
	    return productCartService.findByMemberId(memberId);
	}

	@PostMapping
	public boolean insert(@RequestBody ProductCart productCart) {
		return productCartService.save(productCart);
	}

	@PutMapping
	public boolean update(@RequestBody ProductCart productCart) {
		return productCartService.update(productCart);
	}

	@DeleteMapping
	public boolean delete(@RequestBody ProductCart productCart) {
		return productCartService.delete(productCart);
	}
}
