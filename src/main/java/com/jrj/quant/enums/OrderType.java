package com.jrj.quant.enums;

public enum OrderType {
	market,
	limit,
	stop,
	stopLimit,
	netxCustomType;
	
	public static OrderType getValue(int index)
	{
		return values()[index];
	}
}
