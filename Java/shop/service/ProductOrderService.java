package com.tibame.tga105.shop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga105.shop.domain.Product;
import com.tibame.tga105.shop.domain.ProductCart;
import com.tibame.tga105.shop.domain.ProductOrder;
import com.tibame.tga105.shop.domain.ProductOrderItem;
import com.tibame.tga105.shop.dto.ProductOrderDTO;
import com.tibame.tga105.shop.repository.ProductOrderRepository;

@Service
@Transactional
public class ProductOrderService {
	@Autowired
	private ProductOrderRepository orderRepository;

	@Autowired
	private ProductCartService cartService;

	public List<ProductOrder> findAll() {
		return orderRepository.findAll(Sort.by("orderDate").descending());
	}

	public List<ProductOrderDTO> findByMemberId(Integer id) {
		List<ProductOrder> orders = orderRepository.findByMemberId(id, Sort.by("orderDate").descending());
		return orders.stream().map(order -> {
			ProductOrderDTO dto = new ProductOrderDTO();
			dto.setOrderId(order.getOrderId());
			dto.setOrderDate(order.getOrderDate());
			dto.setTotal(order.getItems().stream().mapToInt(item -> item.getProductPrice()).sum());
			dto.setOrderStatus(order.getOrderStatus());
			return dto;
		}).collect(Collectors.toList());
	}

	public ProductOrder findId(Integer id) {
		Optional<ProductOrder> optional = orderRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public boolean save(ProductOrder productOrder) {
		if (productOrder != null && productOrder.getMemberId() != null) {
			List<ProductCart> pc = cartService.findByMemberId(productOrder.getMemberId());
			if (pc != null && pc.size() != 0) {
				List<ProductOrderItem> items = pc.stream().map(cart -> {
					Product product = cart.getProduct();
					int productNumber = cart.getProductNumber();
					int totalPrice = product.getProductPrice() * productNumber;
					try {
						product.reduceStock(productNumber);
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException("商品庫存不足", e);
					}
					return new ProductOrderItem(product, productNumber, totalPrice);
				}).collect(Collectors.toList());
				items.forEach(productOrder::addOrderItem);
				orderRepository.save(productOrder);
				cartService.deleteByMemberId(productOrder.getMemberId());
				return true;
			}
		}
		return false;
	}

	public boolean update(ProductOrder productOrder) {
		if (productOrder != null) {
			Optional<ProductOrder> optional = orderRepository.findById(productOrder.getOrderId());
			if (optional.isPresent()) {
				optional.get().setOrderStatus(productOrder.getOrderStatus());
				return true;
			}
		}
		return false;
	}

	public boolean delete(ProductOrder productOrder) {
		if (productOrder != null && productOrder.getOrderId() != null) {
			orderRepository.delete(productOrder);
			return true;
		}
		return false;
	}

}
