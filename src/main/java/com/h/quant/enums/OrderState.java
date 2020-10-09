package com.h.quant.enums;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public enum OrderState {
	initial, submitted, accepted, canceled, partiallyFilled, filled;

	static Map<OrderState, Set<OrderState>> valid = new HashMap<OrderState, Set<OrderState>>();

	public static boolean isValidTransition(OrderState oldState, OrderState newState) {
		if (oldState == initial && (newState == submitted || newState == canceled))
			return true;
		if (oldState == submitted && (newState == accepted || newState == canceled))
			return true;
		if (oldState == accepted && (newState == partiallyFilled || newState == filled || newState == canceled))
			return true;
		if (oldState == partiallyFilled && (newState == partiallyFilled || newState == filled || newState == canceled))
			return true;
		return false;
	}

	public static OrderState getValue(int index)
	{
		return values()[index];
	}
}
