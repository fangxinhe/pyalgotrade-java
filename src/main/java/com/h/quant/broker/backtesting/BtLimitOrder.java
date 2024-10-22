package com.h.quant.broker.backtesting;

import com.h.quant.broker.FillInfo;
import com.h.quant.broker.IInstrumentTraits;
import com.h.quant.data.IBar;
import com.h.quant.enums.OrderAction;
import com.h.quant.enums.OrderType;

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
