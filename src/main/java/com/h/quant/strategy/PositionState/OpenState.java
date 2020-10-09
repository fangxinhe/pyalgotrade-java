package com.h.quant.strategy.PositionState;

import com.h.quant.broker.Order;
import com.h.quant.broker.OrderEvent;
import com.h.quant.enums.OrderEventType;
import com.h.quant.strategy.Position;

import java.util.Date;

public class OpenState implements IPostitionState {

    @Override
    public void onEnter(Position postition) {
        Date entryDateTime = postition.getEntryOrder().getExecutionInfo().getDateTime();
        postition.setEntryDateTime(entryDateTime);
    }

    @Override
    public void canSubmitOrder(Position position, Order order) {


    }

    @Override
    public void onOrderEvent(Position position, OrderEvent orderEvent) {
        if (position.getExitOrder() != null && position.getExitOrder().getId() == orderEvent.getOrder().getId()) {
            if (orderEvent.getOrderEventType() == OrderEventType.filled) {
                if (position.getShares() == 0) {
                    position.switchState(new ClosedState());
                    position.getStrategy().onExitOk(position);
                }
            } else if (orderEvent.getOrderEventType() == OrderEventType.canceled) {
                assert position.getShares() != 0;
                position.getStrategy().onExitCanceled(position);
            }
        } else if (position.getEntryOrder().getId() == orderEvent.getOrder().getId()) {
            assert position.getShares() != 0;
        } else {
            assert false;
        }

    }



    @Override
    public boolean isOpen(Position position) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public void exit(Position position, Double stopPrice, Double limitPrice, Boolean goodTillCanceled) {
        assert position.getShares()!=0;
        if(position.isExitActive()) {
            assert false;
        }
        if(position.isEntryActive()) {
            position.getStrategy().getBroker().cancelOrder(position.getEntryOrder());
        }
        position.submitExitOrder(stopPrice,limitPrice,goodTillCanceled);
    }

}
