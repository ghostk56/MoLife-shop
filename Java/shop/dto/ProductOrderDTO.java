package com.tibame.tga105.shop.dto;

import java.util.Date;

public class ProductOrderDTO {

	private Integer orderId;

	private Date orderDate;

	private Integer total;

	private Integer orderStatus;

	public ProductOrderDTO() {
	}

	public ProductOrderDTO(Integer orderId, Date orderDate, Integer total, Integer orderStatus) {
		super();
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.total = total;
		this.orderStatus = orderStatus;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "ProductOrderDTO [orderId=" + orderId + ", orderDate=" + orderDate + ", total=" + total
				+ ", orderStatus=" + orderStatus + "]";
	}
}
