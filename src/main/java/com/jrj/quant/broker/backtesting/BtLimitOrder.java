package com.jrj.quant.broker.backtesting;

import com.jrj.quant.broker.Broker;
import com.jrj.quant.broker.FillInfo;
import com.jrj.quant.broker.IInstrumentTraits;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderType;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class BtLimitOrder extends BtOrder {
    public BtLimitOrder(OrderAction action, String instrument,double limitPrice, Double quantity, IInstrumentTraits instrumentTraits) {
        super(OrderType.limit, action, instrument, quantity, instrumentTraits);
        setLimitPrice(limitPrice);

    }

    @Override
    public FillInfo process(BtBroker broker, IBar bar) {
        return broker.getFillStrategy().fillLimitOrder(broker, this, bar);
    }
}
