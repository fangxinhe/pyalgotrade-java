package com.h.quant.broker.backtesting;

import com.h.quant.broker.FillInfo;
import com.h.quant.broker.IInstrumentTraits;
import com.h.quant.data.IBar;
import com.h.quant.enums.OrderAction;
import com.h.quant.enums.OrderType;

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
