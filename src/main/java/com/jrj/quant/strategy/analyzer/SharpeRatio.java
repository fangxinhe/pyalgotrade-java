package com.jrj.quant.strategy.analyzer;

import com.jrj.quant.IHandler;
import com.jrj.quant.Utils.MathUtil;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;
import com.jrj.quant.strategy.BaseStrategy;

import java.util.*;

/**
 * Created by h on 2016/11/27.
 */
public class SharpeRatio implements IStrategyAnalyzer {

    boolean useDailyReturns;
    List<Double> returns = new LinkedList<>();
    Date firstDateTime = null;
    Date lastDateTime = null;
    Date currentDate = null;
    public SharpeRatio(Boolean useDailyReturns) {
        if(useDailyReturns == null)
            useDailyReturns = true;
        this.useDailyReturns = useDailyReturns;

    }

    public List<Double> getReturns() {
        return returns;
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
        double netReturn = returnsAnalyzerBase.getNetReturn();
        if(useDailyReturns)
        {
            if(dateTime.equals(currentDate))
            {
                if(!returns.isEmpty()) {
                    int lastIndex = returns.size()-1;
                    Double lastReturn = returns.get(returns.size() - 1);
                    lastReturn = (1+lastReturn)*(1+netReturn) -1;
                }
            }
            else
            {
                currentDate = dateTime;
                returns.add(netReturn);
            }
        }
        else {
            returns.add(netReturn);
            if(firstDateTime == null)
                firstDateTime = dateTime;
            lastDateTime = dateTime;
        }
    }

    double sharpe_ratio(List<Double> returns,double riskFreeRate,double tradingPeriods,Boolean annualized)
    {
        if(annualized==null)
            annualized = true;
        double ret = 0;

        double volatility = MathUtil.std(returns);
        if(volatility !=0)
        {
            double rfPerReturn = riskFreeRate/tradingPeriods;
            double avgExcessReturns = MathUtil.mean(returns)-rfPerReturn;
            ret = avgExcessReturns/volatility;
        }
        if(annualized)
            ret = ret * Math.sqrt(tradingPeriods);
        return ret;

    }
    final long dayTime = 1000*3600*24;
    double days_traded(Date begin,Date end)
    {
        long delta = end.getTime() - begin.getTime();
        delta = delta/dayTime +1;
        return delta;
    }

    double sharpe_ratio_2(List<Double> returns,double riskFreeRate,Date firstDateTime,Date lastDateTime,Boolean annualized) {
        if (annualized == null)
            annualized = true;
        double ret = 0;
        double volatility = MathUtil.std(returns);
        if(volatility!=0)
        {
            double yearsTraded = days_traded(firstDateTime,lastDateTime)/365;
            double riskFreeRateForPeriod = riskFreeRate * yearsTraded;
            double rfPerReturn = riskFreeRateForPeriod / returns.size();
            double avgExcessReturns = MathUtil.mean(returns) - rfPerReturn;
            ret = avgExcessReturns / volatility;
            if(annualized)
                ret = ret * Math.sqrt(returns.size() / yearsTraded);
        }
        return ret;
    }



    double getSharpeRatio(double riskFreeRate,Boolean annualized)
    {
        if(annualized == null)
            annualized = true;
        double ret = 0.0;
        if(useDailyReturns)
            ret = sharpe_ratio(returns,riskFreeRate,252,annualized);
        else
            ret = sharpe_ratio_2(returns,riskFreeRate,firstDateTime,lastDateTime,annualized);
        return ret;
    }


    @Override
    public void attached(BaseStrategy strategy) {

    }

    @Override
    public void beforeOnBars(BaseStrategy strategy, DateValues<IBar> bars) {

    }
}
