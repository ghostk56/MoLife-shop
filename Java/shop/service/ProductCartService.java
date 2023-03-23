package com.tibame.tga105.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga105.shop.domain.ProductCart;
import com.tibame.tga105.shop.repository.ProductCartRepository;

@Service
@Transactional
public class ProductCartService {
	@Autowired
	private ProductCartRepository productCartRepository;

	public List<ProductCart> findByMemberId(Integer memberId) {
		return productCartRepository.findByMemberId(memberId);
	}

	public boolean save(ProductCart productCart) {
		if (productCart != null && productCart.getProductCartId() == null) {
			ProductCart pc = productCartRepository.findByMemberIdAndProduct(productCart.getMemberId(),
					productCart.getProduct());
			if (pc == null) {
				productCartRepository.save(productCart);
				return true;
			} else if (productCart.getProductNumber() > 1){
				pc.setProductNumber(productCart.getProductNumber());
				return true;
			} 
		}
		return false;
	}

	public boolean update(ProductCart productCart) {
		if (productCart != null && productCart.getProductCartId() != null) {
			Integer qty = productCartRepository.findById(productCart.getProductCartId()).get().getProduct()
					.getProductQty();
			if (productCart.getProductNumber() <= qty) {
				productCartRepository.save(productCart);
				return true;
			}
		}
		return false;
	}

	public boolean delete(ProductCart productCart) {
		if (productCart != null && productCart.getProductCartId() != null) {
			productCartRepository.delete(productCart);
			return !productCartRepository.findById(productCart.getProductCartId()).isPresent();
		}
		return false;
	}
	
	public void deleteByMemberId (Integer id) {
		productCartRepository.deleteByMemberId(id);
	}
}
