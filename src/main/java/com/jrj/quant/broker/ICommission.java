package com.jrj.quant.broker;

import com.jrj.quant.broker.Order;

/**
 * Created by hefangxin on 2016/11/25.
 */
public interface ICommission {
    double calculate(Order order , double price, double quantity);
}
