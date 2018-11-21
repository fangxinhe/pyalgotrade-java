package com.jrj.quant.strategy.PositionState;

import com.jrj.quant.broker.Order;
import com.jrj.quant.broker.OrderEvent;
import com.jrj.quant.strategy.Position;
import com.jrj.quant.strategy.PositionState.IPostitionState;

import java.util.Date;

public class ClosedState implements IPostitionState {

	@Override
	public void onEnter(Position postition) {
		if(postition.isExitFilled())
		{
			Date exitDateTime = postition.getExitOrder().getExecutionInfo().getDateTime();
			postition.setEntryDateTime(exitDateTime);
		}
		assert postition.getShares() == 0;
		postition.getStrategy().unregisterPosition(postition);
	}

	@Override
	public void canSubmitOrder(Position position, Order order) {
			assert false;
	}

	@Override
	public void onOrderEvent(Position position, OrderEvent orderEvent) {
		assert false;
	}

	@Override
	public boolean isOpen(Position position) {
		return false;
	}

	@Override
	public void exit(Position position, Double stopPrice, Double limitPrice, Boolean goodTillCanceled) {

	}

}
