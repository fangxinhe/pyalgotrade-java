package com.jrj.quant.strategy.analyzer;

import com.jrj.quant.data.IBar;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.strategy.BaseStrategy;

public interface IStrategyAnalyzer {

	void beforeAttach(BaseStrategy strategy);
	
	void attached(BaseStrategy strategy);
	
	void beforeOnBars(BaseStrategy strategy,DateValues<IBar> bars);
	
}
