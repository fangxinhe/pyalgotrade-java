package com.h.quant.broker;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class FillInfo {
    double price;
    double quantity;

    public FillInfo(double price, double quantity) {
        this.price = price;
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public double getQuantity() {
        return quantity;
    }
}
