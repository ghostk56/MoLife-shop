package com.tibame.tga105.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga105.shop.domain.Product;
import com.tibame.tga105.shop.repository.ProductRepository;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<Product> selectAll() {
		List<Product> products = productRepository.findAll(Sort.by("productCreateDate").descending());
		return products;
	}

	public Product selectId(Integer id) {
		if (id != null && !id.equals(0)) {
			return productRepository.findByProductId(id);
		}
		return null;
	}
	
	public List<Product> findSpecification(Integer productStatus, Integer animalTypeId, Integer categoryId) {
        Specification<Product> spec = Specification.where(null);
        if (productStatus != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("productStatus"), productStatus));
        }
        if (animalTypeId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("animalTypeId"), animalTypeId));
        }
        if (categoryId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("categoryId"), categoryId));
        }
        spec = spec.and((root, query, cb) -> cb.greaterThan(root.get("productQty"), 0));
        
        Sort sort = Sort.by(Sort.Direction.DESC, "productCreateDate");
        return productRepository.findAll(spec, sort);
    }

	public boolean insert(Product product) {
		if (product != null) {
			product.getProductImages().forEach(productImage -> productImage.setProduct(product));
			productRepository.save(product);
			return true;
		}
		return false;
	}

	public boolean update(Product product) {
		if (product != null) {
			Product original = productRepository.findByProductId(product.getProductId());
			if (original != null) {
				product.getProductImages().forEach(productImage -> productImage.setProduct(product));
				productRepository.save(product);
				return true;
			}
		}
		return false;
	}

}