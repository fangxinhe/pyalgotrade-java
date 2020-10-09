package com.h.quant.broker.backtesting;

import com.h.quant.broker.FillInfo;
import com.h.quant.broker.IInstrumentTraits;
import com.h.quant.data.IBar;
import com.h.quant.enums.OrderAction;
import com.h.quant.enums.OrderType;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class BtStopOrder extends BtOrder {
    boolean stopHit = false;
    public BtStopOrder(OrderAction action, String instrument, double stopPrice, Double quantity, IInstrumentTraits instrumentTraits) {
        super(OrderType.stop, action, instrument, quantity, instrumentTraits);
        setStopPrice(stopPrice);

    }

    public boolean isStopHit() {
        return stopHit;
    }

    public void setStopHit(boolean stopHit) {
        this.stopHit = stopHit;
    }

    @Override
    public FillInfo process(BtBroker broker, IBar bar) {
        return broker.getFillStrategy().fillStopOrder(broker, this, bar);
    }
}
