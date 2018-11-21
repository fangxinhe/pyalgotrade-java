package com.jrj.quant.broker;

public class NoCommission implements ICommission {

	@Override
	public double calculate(Order order, double price, double quantity) {
		return 0;
	}

}
