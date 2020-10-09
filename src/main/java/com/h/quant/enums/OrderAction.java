package com.h.quant.enums;

public enum OrderAction {
	buy,
	buyToCover,//买空
	sell,
	sellShort;//卖空
	public static OrderAction getValue(int index)
	{
		return values()[index];
	}
}
