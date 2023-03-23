package com.tibame.tga105.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tibame.tga105.shop.domain.ProductOrderItem;

@Repository
public interface ProductOrderItemRepository extends JpaRepository<ProductOrderItem, Integer> {

}
