package com.tibame.tga105.shop.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "product")
@NamedEntityGraph(name = "product.fk", attributeNodes = { @NamedAttributeNode("category"),
		@NamedAttributeNode("animalType") })
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_details")
	private String productDetails;

	@Column(name = "product_price")
	private Integer productPrice;

	@Column(name = "product_qty")
	private Integer productQty;

	@Column(name = "product_status")
	private Integer productStatus;

	@Column(name = "product_create_date", insertable = false, updatable = false)
	private java.util.Date productCreateDate;

	@Column(name = "animal_type_id")
	private Integer animalTypeId;

	@Column(name = "category_id")
	private Integer categoryId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "animal_type_id", referencedColumnName = "animal_type_id", insertable = false, updatable = false)
	private AnimalType animalType;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id", referencedColumnName = "category_id", insertable = false, updatable = false)
	private Category category;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductImage> productImages = new ArrayList<>();
	
	public void reduceStock(int quantity) throws Exception {
        if (productQty < quantity) {
            throw new RuntimeException("Stock is not enough");
        }
        productQty -= quantity;
    }

	public List<ProductImage> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<ProductImage> productImages) {
		this.productImages = productImages;
	}

	public AnimalType getAnimalType() {
		return this.animalType;
	}

	public Category getCategory() {
		return this.category;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(String productDetails) {
		this.productDetails = productDetails;
	}

	public Integer getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Integer productPrice) {
		this.productPrice = productPrice;
	}

	public Integer getProductQty() {
		return productQty;
	}

	public void setProductQty(Integer productQty) {
		this.productQty = productQty;
	}

	public Integer getProductStatus() {
		return productStatus;
	}

	public void setProductStatus(Integer productStatus) {
		this.productStatus = productStatus;
	}

	public java.util.Date getProductCreateDate() {
		return productCreateDate;
	}

	public void setProductCreateDate(java.util.Date productCreateDate) {
		this.productCreateDate = productCreateDate;
	}

	public Integer getAnimalTypeId() {
		return animalTypeId;
	}

	public void setAnimalTypeId(Integer animalTypeId) {
		this.animalTypeId = animalTypeId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productName=" + productName + ", productDetails="
				+ productDetails + ", productPrice=" + productPrice + ", productQty=" + productQty + ", productStatus="
				+ productStatus + ", productCreateDate=" + productCreateDate + ", animalTypeId=" + animalTypeId
				+ ", categoryId=" + categoryId + "]";
	}
}
