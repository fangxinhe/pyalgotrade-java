package com.jrj.quant.strategy;

import com.jrj.quant.barfeed.BaseBarFeed;
import com.jrj.quant.broker.Broker;
import com.jrj.quant.broker.ICommission;
import com.jrj.quant.broker.backtesting.BtBroker;
import com.jrj.quant.data.Bars;
import com.jrj.quant.data.IBar;

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
