package com.tibame.tga105.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga105.shop.domain.ProductCollection;
import com.tibame.tga105.shop.repository.ProductCollectionRepository;

@Service
@Transactional
public class ProductCollectionService {
	@Autowired
	private ProductCollectionRepository productCollectionRepository;

	public List<ProductCollection> findByMemberId(Integer memberId) {
		return productCollectionRepository.findByMemberId(memberId);
	}

	public boolean save(ProductCollection productCollection) {
		if (productCollection != null) {
			ProductCollection pc = productCollectionRepository.findByMemberIdAndProduct(productCollection.getMemberId(),
					productCollection.getProduct());
			if (pc == null) {
				productCollectionRepository.save(productCollection);
				return true;
			} else {
				delete(pc);
			}
		}
		return false;
	}

	public boolean delete(ProductCollection productCollection) {
		if (productCollection != null && productCollection.getCollectionId() != null) {
			productCollectionRepository.delete(productCollection);
			return !productCollectionRepository.findById(productCollection.getCollectionId()).isPresent();
		}
		return false;
	}
}
