package com.tibame.tga105.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tibame.tga105.shop.domain.ProductOrder;
import com.tibame.tga105.shop.dto.ProductOrderDTO;
import com.tibame.tga105.shop.service.ProductOrderService;

@RestController
@RequestMapping("/productorders")
public class ProductOrderController {
	@Autowired
	private ProductOrderService OrderService;

	@GetMapping("/{id}/orders")
	public List<ProductOrderDTO> selectByMemberId(@PathVariable Integer id) {
		return OrderService.findByMemberId(id);
	}

	@GetMapping("/{id}")
	public ProductOrder selectById(@PathVariable Integer id) {
		return OrderService.findId(id);
	}

	@GetMapping
	public List<ProductOrder> selectAll() {
		return OrderService.findAll();
	}

	@PostMapping
	public boolean insert(@RequestBody ProductOrder productOrder) {
		return OrderService.save(productOrder);
	}

	@PutMapping
	public boolean update(@RequestBody ProductOrder productOrder) {
		return OrderService.update(productOrder);
	}
}
