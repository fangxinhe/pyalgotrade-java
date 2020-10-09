package com.h.quant.strategy;

import com.h.quant.broker.Order;
import com.h.quant.enums.OrderAction;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class ShortPosition extends Position {
    public ShortPosition(BaseStrategy strategy, String instrument, Double stopPrice, Double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        super(strategy, goodTillCanceled, allOrNone);
        Order entryOrder = null;
        if (stopPrice == null) {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createMarketOrder(OrderAction.sellShort, instrument, quantity, false);
            else
                entryOrder = getStrategy().getBroker().createLimitOrder(OrderAction.sellShort, instrument, limitPrice, quantity);
        } else {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createStopOrder(OrderAction.sellShort, instrument, stopPrice, quantity);
            else
                entryOrder = getStrategy().getBroker().createStopLimitOrder(OrderAction.sellShort, instrument, stopPrice, limitPrice, quantity);
        }
        init(entryOrder, goodTillCanceled);
    }

    @Override
    public Order buildExitOrder(Double stopPrice, Double limitPrice) {
        double quantity = -getShares();
        assert quantity > 0;
        Order entryOrder = null;
        if (stopPrice == null) {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createMarketOrder(OrderAction.buyToCover, getInstrument(), quantity, false);
            else
                entryOrder = getStrategy().getBroker().createLimitOrder(OrderAction.buyToCover, getInstrument(), limitPrice, quantity);
        } else {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createStopOrder(OrderAction.buyToCover, getInstrument(), stopPrice, quantity);
            else
                entryOrder = getStrategy().getBroker().createStopLimitOrder(OrderAction.buyToCover, getInstrument(), stopPrice, limitPrice, quantity);
        }

        return entryOrder;
    }
}
