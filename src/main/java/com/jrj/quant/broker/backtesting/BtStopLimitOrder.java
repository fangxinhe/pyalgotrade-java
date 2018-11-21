package com.jrj.quant.broker.backtesting;

import com.jrj.quant.broker.FillInfo;
import com.jrj.quant.broker.IInstrumentTraits;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderType;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class BtStopLimitOrder extends BtOrder {
    boolean stopHit = false;
    public BtStopLimitOrder(OrderAction action, String instrument,double stopPrice, double limitPrice, Double quantity, IInstrumentTraits instrumentTraits) {
        super(OrderType.stopLimit, action, instrument, quantity, instrumentTraits);
        setLimitPrice(limitPrice);
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
        return broker.getFillStrategy().fillStopLimitOrder(broker, this, bar);
    }
}
