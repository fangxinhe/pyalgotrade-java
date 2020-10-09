package com.h.quant.broker.backtesting;

import com.h.quant.broker.FillInfo;
import com.h.quant.broker.IInstrumentTraits;
import com.h.quant.broker.Order;
import com.h.quant.data.IBar;
import com.h.quant.enums.OrderAction;
import com.h.quant.enums.OrderType;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/25.
 */
public abstract class BtOrder extends Order{

    Date acceptedDateTime = null;

    public BtOrder(OrderType type, OrderAction action, String instrument, Double quantity, IInstrumentTraits instrumentTraits ) {
        super(type, action, instrument, quantity, instrumentTraits);
    }

    public Date getAcceptedDateTime() {
        return acceptedDateTime;
    }

    public void setAcceptedDateTime(Date acceptedDateTime) {
        this.acceptedDateTime = acceptedDateTime;
    }

    public abstract FillInfo process(BtBroker broker, IBar bar);
}
