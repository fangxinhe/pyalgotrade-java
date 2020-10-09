package com.h.quant.strategy;

import com.h.quant.exceptions.CompileException;

public interface IStrategyFactory {
	BaseStrategy createStrategy(String input) throws CompileException;
	String getOutput();
	void clearOutput();
}
