package com.h.quant.run.backtest;

import java.util.List;

import com.h.quant.data.DateValues;
import com.h.quant.data.IBar;
import com.h.quant.strategy.BaseStrategy;
import com.h.quant.strategy.analyzer.IStrategyAnalyzer;

public class Drawdown implements IStrategyAnalyzer {

	
	DrawdownHelper currentDrawdown = new DrawdownHelper();
	
	double maxDD = 0;
	
	long longestDDDuration = 0 ;

	
	public Drawdown()
	{
		
	}
	
	double calculateEquity(BaseStrategy strategy)
	{
		return strategy.getBroker().getEquity();
	}
	
	
	@Override
	public void beforeAttach(BaseStrategy strategy) {


	}

	@Override
	public void attached(BaseStrategy strategy) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeOnBars(BaseStrategy strategy, DateValues<IBar> bars) {
		Double equity = calculateEquity(strategy);
		currentDrawdown.update(bars.getDateTime(),equity,equity);
		maxDD = Math.min(maxDD,currentDrawdown.getMaxDrawDown());
	}

	public double getMaxDrawDown()
	{
		return Math.abs(maxDD);
	}

	public long getLongestDrawDownDuration()
	{
		return longestDDDuration;
	}


}
