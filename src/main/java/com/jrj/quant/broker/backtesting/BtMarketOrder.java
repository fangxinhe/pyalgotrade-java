package com.jrj.quant.broker.backtesting;

import com.jrj.quant.broker.FillInfo;
import com.jrj.quant.broker.IInstrumentTraits;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderType;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class BtMarketOrder extends BtOrder {
    public BtMarketOrder( OrderAction action, String instrument, Double quantity,Boolean onClose ,IInstrumentTraits instrumentTraits) {
        super(OrderType.market, action, instrument, quantity, instrumentTraits);
        setOnClose(onClose);
    }

    @Override
    public FillInfo process(BtBroker broker, IBar bar) {
        return broker.getFillStrategy().fillMarketOrder(broker,this,bar);
    }
}
