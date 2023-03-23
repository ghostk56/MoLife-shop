package com.tibame.tga105.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tibame.tga105.shop.domain.Product;
import com.tibame.tga105.shop.domain.ProductCollection;

@Repository
public interface ProductCollectionRepository extends JpaRepository<ProductCollection, Integer> {

	ProductCollection findByMemberIdAndProduct(Integer memberId, Product product);

	List<ProductCollection> findByMemberId(Integer memberId);
}
