package com.jrj.quant.broker;

import com.jrj.quant.data.IBar;

public interface ISlippageModel {
	double calculatePrice(Order order, double price, double quantity, IBar bar, double volumeUsed);
}
