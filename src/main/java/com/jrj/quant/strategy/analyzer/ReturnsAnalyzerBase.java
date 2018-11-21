package com.jrj.quant.strategy.analyzer;

import com.jrj.quant.Event;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;
import com.jrj.quant.strategy.BaseStrategy;
import org.python.antlr.op.Is;

import java.util.Map;

/**
 * Created by h on 2016/11/27.
 */
public class ReturnsAnalyzerBase implements IStrategyAnalyzer {

    Event event = new Event();
    TimeWeightedReturns portfolioReturns = null;

    public Event getEvent() {
        return event;
    }

    public static ReturnsAnalyzerBase getOrCreateShared(BaseStrategy strategy)
    {
        String name = ReturnsAnalyzerBase.class.getName();
        ReturnsAnalyzerBase ret = (ReturnsAnalyzerBase) strategy.getNameAnalyzer(name);
        if(ret == null)
        {
            ret = new ReturnsAnalyzerBase();
            strategy.attachAnalyzer(ret);
        }
        return ret;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public double getEquip()
    {
        return portfolioReturns.getLastReturns();
    }


    public double getNetReturn(){
        return portfolioReturns.getLastPeriodReturns();
    }

    public double getCumulativeReturn() {
        return portfolioReturns.getCumulativeReturns();
    }

    public void setPortfolioReturns(TimeWeightedReturns portfolioReturns) {
        this.portfolioReturns = portfolioReturns;
    }

    @Override
    public void beforeAttach(BaseStrategy strategy) {

    }

    @Override
    public void attached(BaseStrategy strategy) {
        portfolioReturns = new TimeWeightedReturns(strategy.getBroker().getEquity());//净值
    }

    @Override
    public void beforeOnBars(BaseStrategy strategy, DateValues<IBar> bars) {
        portfolioReturns.update(strategy.getBroker().getEquity());
        event.emit(bars.getDateTime(),this);
    }
}
