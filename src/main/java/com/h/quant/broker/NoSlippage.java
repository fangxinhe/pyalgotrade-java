package com.h.quant.broker;

import com.h.quant.data.IBar;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class NoSlippage implements ISlippageModel {
    @Override
    public double calculatePrice(Order order, double price, double quantity, IBar bar, double volumeUsed) {
        return price;
    }
}
