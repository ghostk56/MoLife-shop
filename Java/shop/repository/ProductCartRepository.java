package com.tibame.tga105.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tibame.tga105.shop.domain.Product;
import com.tibame.tga105.shop.domain.ProductCart;

@Repository
public interface ProductCartRepository extends JpaRepository<ProductCart, Integer> {

	ProductCart findByMemberIdAndProduct(Integer memberId, Product product);

	List<ProductCart> findByMemberId(Integer memberId);
	
	void deleteByMemberId(Integer memberId);
}
