package com.jrj.quant.broker.backtesting;

import com.jrj.quant.broker.Broker;
import com.jrj.quant.broker.FillInfo;
import com.jrj.quant.broker.IInstrumentTraits;
import com.jrj.quant.broker.Order;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderType;

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
