package com.jrj.quant.broker.backtesting;

import com.jrj.quant.broker.FillInfo;
import com.jrj.quant.broker.IInstrumentTraits;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderType;

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
