package com.h.quant.strategy.analyzer;

import com.h.quant.strategy.BaseStrategy;
import com.h.quant.data.IBar;
import com.h.quant.data.DateValues;

public interface IStrategyAnalyzer {

	void beforeAttach(BaseStrategy strategy);
	
	void attached(BaseStrategy strategy);
	
	void beforeOnBars(BaseStrategy strategy,DateValues<IBar> bars);
	
}
