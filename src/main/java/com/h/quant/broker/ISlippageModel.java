package com.h.quant.broker;

import com.h.quant.data.IBar;

public interface ISlippageModel {
	double calculatePrice(Order order, double price, double quantity, IBar bar, double volumeUsed);
}
