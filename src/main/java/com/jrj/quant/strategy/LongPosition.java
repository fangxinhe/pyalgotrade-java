package com.jrj.quant.strategy;

import com.jrj.quant.broker.Order;
import com.jrj.quant.enums.OrderAction;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class LongPosition extends Position {
    public LongPosition(BaseStrategy strategy, String instrument, Double stopPrice, Double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        super(strategy, goodTillCanceled, allOrNone);
        Order entryOrder = null;
        if (stopPrice == null) {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createMarketOrder(OrderAction.buy, instrument, quantity, false);
            else
                entryOrder = getStrategy().getBroker().createLimitOrder(OrderAction.buy, instrument, limitPrice, quantity);
        } else {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createStopOrder(OrderAction.buy, instrument, stopPrice, quantity);
            else
                entryOrder = getStrategy().getBroker().createStopLimitOrder(OrderAction.buy, instrument, stopPrice, limitPrice, quantity);
        }
        init(entryOrder, goodTillCanceled);
    }

    @Override
    public Order buildExitOrder(Double stopPrice, Double limitPrice) {
        double quantity = getShares();
        assert quantity > 0;
        Order entryOrder = null;
        if (stopPrice == null) {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createMarketOrder(OrderAction.sell, getInstrument(), quantity, false);
            else
                entryOrder = getStrategy().getBroker().createLimitOrder(OrderAction.sell, getInstrument(), limitPrice, quantity);
        } else {
            if (limitPrice == null)
                entryOrder = getStrategy().getBroker().createStopOrder(OrderAction.sell, getInstrument(), stopPrice, quantity);
            else
                entryOrder = getStrategy().getBroker().createStopLimitOrder(OrderAction.sell, getInstrument(), stopPrice, limitPrice, quantity);
        }


        return entryOrder;
    }
}
