package com.tibame.tga105.shop.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "product_order")
public class ProductOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Integer orderId;

	@Column(name = "member_id")
	private Integer memberId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "order_date",insertable = false, updatable = false)
	private Date orderDate;

	@Column(name = "order_status")
	private Integer orderStatus;

	@Column(name = "order_receiver")
	private String orderReceiver;

	@Column(name = "order_address")
	private String orderAddress;

	@Column(name = "order_mobile")
	private String orderMobile;

	@Column(name = "order_message")
	private String orderMessage;

	@OneToMany(mappedBy = "productOrder", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductOrderItem> items = new ArrayList<>();

	public void addOrderItem(ProductOrderItem Item) {
		this.items.add(Item);
		Item.setProductOrder(this);
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Integer getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getOrderReceiver() {
		return orderReceiver;
	}

	public void setOrderReceiver(String orderReceiver) {
		this.orderReceiver = orderReceiver;
	}

	public String getOrderAddress() {
		return orderAddress;
	}

	public void setOrderAddress(String orderAddress) {
		this.orderAddress = orderAddress;
	}

	public String getOrderMobile() {
		return orderMobile;
	}

	public void setOrderMobile(String orderMobile) {
		this.orderMobile = orderMobile;
	}

	public String getOrderMessage() {
		return orderMessage;
	}

	public void setOrderMessage(String orderMessage) {
		this.orderMessage = orderMessage;
	}

	public List<ProductOrderItem> getItems() {
		return items;
	}

	public void setItems(List<ProductOrderItem> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "ProductOrder [orderId=" + orderId + ", memberId=" + memberId + ", orderDate=" + orderDate
				+ ", orderStatus=" + orderStatus + ", orderReceiver=" + orderReceiver + ", orderAddress=" + orderAddress
				+ ", orderMobile=" + orderMobile + ", orderMessage=" + orderMessage + "]";
	}
}
