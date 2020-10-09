package com.h.quant.broker;

import java.util.Date;

public class OrderExecutionInfo {
	final double price;
	final double quantity;
	final double commission;
	final Date dateTime;

	public OrderExecutionInfo(double price, double quantity, double commission, Date dateTime) {
		super();
		this.price = price;
		this.quantity = quantity;
		this.commission = commission;
		this.dateTime = dateTime;
	}

	public double getPrice() {
		return price;
	}

	public double getQuantity() {
		return quantity;
	}

	public double getCommission() {
		return commission;
	}

	public Date getDateTime() {
		return dateTime;
	}

}
