package com.jrj.quant.enums;

public enum BarSize {
	Tick,
	Second1,
	Second5,
	Second15,
	Second30,
	Minute1,
	Minute2,
	Minute5,
	Minute15,
	Minute30,
	Hour1,
	Day1,
	Week,
	Month,
	Quarter,
	Year1;
	public static BarSize getValue(int index)
	{
		return values()[index];
	}
	
}
