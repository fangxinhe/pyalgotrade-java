package com.jrj.quant.strategy;

import com.jrj.quant.exceptions.CompileException;

public interface IStrategyFactory {
	BaseStrategy createStrategy(String input) throws CompileException;
	String getOutput();
	void clearOutput();
}
