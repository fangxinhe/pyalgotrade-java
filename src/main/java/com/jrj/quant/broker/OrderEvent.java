package com.jrj.quant.broker;

import com.jrj.quant.enums.OrderEventType;

public class OrderEvent {
	final Order order;
	final OrderEventType orderEventType;
	final OrderExecutionInfo eventInfo;

	public OrderEvent(Order order, OrderEventType orderEventType, OrderExecutionInfo eventInfo) {
		super();
		this.order = order;
		this.orderEventType = orderEventType;
		this.eventInfo = eventInfo;
	}

	public Order getOrder() {
		return order;
	}

	public OrderEventType getOrderEventType() {
		return orderEventType;
	}

	public OrderExecutionInfo getEventInfo() {
		return eventInfo;
	}

}
