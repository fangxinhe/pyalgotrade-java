package com.jrj.quant.broker;

import com.jrj.quant.Dispatcher;
import com.jrj.quant.Event;
import com.jrj.quant.Subject;
import com.jrj.quant.enums.OrderAction;

import java.util.List;
import java.util.Map;

public abstract class Broker extends Subject{


	Event orderEvent = new Event();
	boolean useAdjustedValue;
	public Broker() {

	}

	public int getDispatchPriority()
	{
		return Dispatcher.dispatchPrioBroker;
	}

	public void notifyOrderEvent(OrderEvent orderEvent)
	{
		this.orderEvent.emit(orderEvent);
	}

	public Event getOrderUpdatedEvent()
	{
		return orderEvent;
	}

	public abstract IInstrumentTraits getInstrumentTraits(String instrument);
	public abstract double getCash(Boolean includeShort);
	public abstract double getShares(String instrument);
	public abstract Map<String,Double> getPositions();
	public abstract List<Order> getActiveOrders(String instrument);
	public abstract void submitOrder(Order order);
	public abstract Order createMarketOrder(OrderAction action,String instrument,double quantity,Boolean onClose);
	public abstract Order createLimitOrder(OrderAction action,String instrument,double limitPrice,double quantity );
	public abstract Order createStopOrder(OrderAction action,String instrument,double stopPrice,double quantity );
	public abstract Order createStopLimitOrder(OrderAction action,String instrument,double stopPrice,double limitPrice,double quantity );
	public abstract void cancelOrder(Order order);
	public abstract double getEquity();

	public boolean isUseAdjustedValue() {
		return useAdjustedValue;
	}

	public void setUseAdjustedValue(boolean useAdjustedValue) {
		this.useAdjustedValue = useAdjustedValue;
	}
}
