package com.h.quant.strategy.analyzer;

import java.util.DoubleSummaryStatistics;

/**
 * Created by h on 2016/11/27.
 */
public class TimeWeightedReturns {
    Double lastValue = null;
    double flows = 0.0;
    double lastPeriodRet = 0.0;
    double cumRet = 0.0;

    public TimeWeightedReturns(Double lastValue) {
        this.lastValue = lastValue;
    }

    public void deposit(double amount) {
        this.flows += amount;
    }

    public void withdraw(double amount) {
        flows -= amount;
    }

    public double getCurrentValue() {
        return lastValue;
    }

    public void update(Double currentValue){
        double retSubperiod = 0;
        if(lastValue!=null)
        {
            retSubperiod = (currentValue - lastValue - flows)/lastValue;
        }
        cumRet = (1+cumRet)*(1+retSubperiod)-1;
        lastPeriodRet = retSubperiod;
        lastValue = currentValue;
        flows = 0;
    }

    public double getLastReturns(){
        return lastValue;
    }
    public double getLastPeriodReturns(){
        return lastPeriodRet;
    }
    public double getCumulativeReturns(){
        return cumRet;
    }


}
