package com.h.quant.strategy.analyzer;

import com.h.quant.dataseries.SequenceDataSeries;
import com.h.quant.IHandler;
import com.h.quant.data.DateValues;
import com.h.quant.data.IBar;
import com.h.quant.strategy.BaseStrategy;

import java.util.Date;

/**
 * Created by h on 2016/11/27.
 */
public class Returns implements IStrategyAnalyzer {
    SequenceDataSeries<Double> netReturns = null;
    SequenceDataSeries<Double> cumReturns = null;
    SequenceDataSeries<Double> equips = null;

    public Returns() {
        netReturns = new SequenceDataSeries<Double>(null);
        cumReturns = new SequenceDataSeries<Double>(null);
        equips = new SequenceDataSeries<Double>(null);
    }

    @Override
    public void beforeAttach(BaseStrategy strategy) {
        ReturnsAnalyzerBase analyzerBase = ReturnsAnalyzerBase.getOrCreateShared(strategy);
        analyzerBase.getEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                onReturns((Date)args[0],(ReturnsAnalyzerBase) args[1]);
            }
        });
    }

    void onReturns(Date dateTime, ReturnsAnalyzerBase returnsAnalyzerBase)
    {
        netReturns.addData(dateTime,returnsAnalyzerBase.getNetReturn());
        cumReturns.addData(dateTime,returnsAnalyzerBase.getCumulativeReturn());
        equips.addData(dateTime,returnsAnalyzerBase.getEquip());
    }

    public SequenceDataSeries<Double> getReturns() {
        return netReturns;
    }

    public SequenceDataSeries<Double> getCumulativeReturns() {
        return cumReturns;
    }

    public SequenceDataSeries<Double> getEquips() {
        return equips;
    }

    @Override
    public void attached(BaseStrategy strategy) {

    }

    @Override
    public void beforeOnBars(BaseStrategy strategy, DateValues<IBar> bars) {

    }
}
