package com.h.quant.strategy;

import com.h.quant.barfeed.BaseBarFeed;
import com.h.quant.broker.Broker;
import com.h.quant.broker.ICommission;
import com.h.quant.broker.backtesting.BtBroker;
import com.h.quant.data.Bars;
import com.h.quant.data.IBar;

import java.util.Date;
import java.util.Map;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class BacktestingStrategy extends BaseStrategy {
    Boolean useAdjustedValues = false;



    public BacktestingStrategy(BaseBarFeed barFeed, Broker broker, Double cash) {

    }
    public BacktestingStrategy() {
        super();

    }

    public void init(BtBroker broker, BaseBarFeed barFeed, double cash, ICommission commission) {
        if(broker==null) {
            broker = new BtBroker();
            ((BtBroker)broker).init(barFeed,cash,commission);
        }
        super.init(broker, barFeed);
    }

    @Override
    boolean getUseAdjustedValues() {
        return useAdjustedValues;
    }

    void setUseAdjustedValues(boolean useAdjusted)
    {
        getBarFeed().setUseAdjustedValues(useAdjusted);
        getBroker().setUseAdjustedValue(useAdjusted);
        useAdjustedValues = useAdjusted;
    }

    @Override
    public void onFinish(Bars bars) {
        //System.out.println("123");
    }

    @Override
    public void onBars(Date dateTime, Map<String, IBar> bars) {

    }


}
