package com.jrj.quant.broker;

import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;

import java.util.Map;

/**
 * Created by hefangxin on 2016/11/25.
 */
public interface FillStrategy {
    void onBars(Broker broker, Map<String,IBar> bars);
    void onOrderFilled(Broker broker,Order order);
    FillInfo fillMarketOrder(Broker broker,Order order,IBar bar);
    FillInfo fillLimitOrder(Broker broker,Order order,IBar bar);
    FillInfo fillStopOrder(Broker broker,Order order,IBar bar);
    FillInfo fillStopLimitOrder(Broker broker,Order order,IBar bar);


}
