package com.jrj.quant.broker;

public class FixedPerTradeCommission implements ICommission {

	double amount = 0;
	
	
	
	public FixedPerTradeCommission(double amount) {
		super();
		this.amount = amount;
	}



	@Override
	public double calculate(Order order, double price, double quantity) {
		double ret  = 0;
		//if(order.gete)
		return 0;
	}

}
