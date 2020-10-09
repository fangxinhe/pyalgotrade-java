package com.h.quant.strategy.PositionState;

import com.h.quant.broker.Order;
import com.h.quant.broker.OrderEvent;
import com.h.quant.enums.OrderEventType;
import com.h.quant.strategy.Position;

public class WaitingEntryState implements IPostitionState {

	@Override
	public void onEnter(Position postition) {
		//if(postition.is)
	}

	@Override
	public void canSubmitOrder(Position position, Order order) {
		if(position.isEntryActive())
			assert false;

	}

	@Override
	public void onOrderEvent(Position position, OrderEvent orderEvent) {
		assert position.getEntryOrder().getId() == orderEvent.getOrder().getId();
		if(orderEvent.getOrderEventType() == OrderEventType.filled || orderEvent.getOrderEventType() == OrderEventType.partiallyFilled)
		{
			position.switchState(new OpenState());
			position.getStrategy().onEnterOk(position);
		}
		else if(orderEvent.getOrderEventType()==OrderEventType.canceled)
		{
			assert position.getEntryOrder().getFilled()==0;
			position.switchState(new ClosedState());
			position.getStrategy().onEnterCanceled(position);
		}

	}

	@Override
	public boolean isOpen(Position position) {
		return true;
	}

	@Override
	public void exit(Position position, Double stopPrice, Double limitPrice, Boolean goodTillCanceled) {
		assert position.getShares()==0;
		assert position.getEntryOrder().isActive();
		position.getStrategy().getBroker().cancelOrder(position.getEntryOrder());
	}

}
