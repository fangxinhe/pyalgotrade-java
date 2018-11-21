package com.jrj.quant.broker.backtesting;

import java.util.*;
import java.util.stream.Collectors;

import com.jrj.quant.Dispatcher;
import com.jrj.quant.IHandler;
import com.jrj.quant.barfeed.BaseBarFeed;
import com.jrj.quant.broker.*;
import com.jrj.quant.data.Bars;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.BarFrequency;
import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderEventType;
import com.jrj.quant.enums.OrderState;

public class BtBroker extends Broker {

    double cash;
    ICommission commission = new NoCommission();
    Map<String,Double> shares = new HashMap<>();
    Map<Integer,BtOrder> activeOrders = new HashMap<>();
    Boolean useAdjustedValues = false;
    DefaultStrategy fillStrategy = new DefaultStrategy(null);
    BaseBarFeed barFeed;
    Boolean allowNegativeCash =false;
    int  nextOrderId = 1;


    public BtBroker() {

    }
    public void init(BaseBarFeed barFeed,Double cash,ICommission commission)
    {

        this.cash = cash;
        if(commission == null)
            this.commission = new NoCommission();
        else
            this.commission = commission;
        barFeed.getNewValuesEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                onBars((DateValues<IBar>)args[0]);
            }
        });

        this.barFeed = barFeed;
    }



    public void onBars(DateValues<IBar> dvbars)
    {
        Date dateTime = dvbars.getDateTime();
        Map<String,IBar> bars  = dvbars.getDatas();
        fillStrategy.onBars(this,bars);
        for(BtOrder order :activeOrders.values())
        {
            onBarsImpl(order,bars);
        }
    }
    void onBarsImpl(BtOrder order,Map<String,IBar> bars)   {
        IBar bar = bars.get(order.getInstrument());
        if(bar==null)
            return;
        if(order.isSubmitted())
        {
            order.setAcceptedDateTime(bar.getDateTime());
            order.switchState(OrderState.accepted);
            notifyOrderEvent(new OrderEvent(order, OrderEventType.accepted,null));
        }
        if(order.isActive())
        {
            processOrder(order,bar);
        }
        else
        {
            assert false;
        }
    }

    void processOrder(BtOrder order,IBar bar)
    {
        if(!preProcessOrder(order,bar))
        {
            return;
        }
        FillInfo fillInfo = order.process(this,bar);
        if(fillInfo!=null)
            commitOrderExecution(order,bar.getDateTime(),fillInfo);
        if(order.isActive())
        {
            postProcessOrder(order,bar);
        }
    }

    public void commitOrderExecution(BtOrder order, Date dateTime,FillInfo fillInfo)
    {
        double price = fillInfo.getPrice();
        double quantity = fillInfo.getQuantity();
        double sharesDelta =0 ;
        double cost=0;
        if(order.isBuy())
        {
            cost = price*-quantity;
            assert cost<0;
            sharesDelta = quantity;
        }
        else
            assert false;
        double commission = this.commission.calculate(order,price,quantity);
        cost -= commission;
        double resultingCash = this.cash+cost;
        if(resultingCash>=0 || allowNegativeCash)
        {
            OrderExecutionInfo orderExecutionInfo = new OrderExecutionInfo(price,quantity,commission,dateTime);
            order.addExecutionInfo(orderExecutionInfo);
            cash = resultingCash;
            double updatedShares = order.getInstrumentTraits().roundQuantity(getShares(order.getInstrument())+sharesDelta);
            if(updatedShares==0)
                shares.remove(order.getInstrument());
            else
                shares.put(order.getInstrument(),updatedShares);
            fillStrategy.onOrderFilled(this,order);
            if(order.isFilled())
            {
                unregisterOrder(order);
                notifyOrderEvent(new OrderEvent(order,OrderEventType.filled,orderExecutionInfo));
            }
            else if(order.isPartiallyFilled())
                notifyOrderEvent(new OrderEvent(order,OrderEventType.partiallyFilled,orderExecutionInfo));
            else
                assert false;

        }
        else
        {
            assert false;
        }
    }

    public double getCash() {
        return cash;
    }

    public void setCash(double cash) {
        this.cash = cash;
    }

    public ICommission getCommission() {
        return commission;
    }

    public void setCommission(ICommission commission) {
        this.commission = commission;
    }

    public Map<String, Double> getShares() {
        return shares;
    }

    public void setShares(Map<String, Double> shares) {
        this.shares = shares;
    }

    public Map<Integer, BtOrder> getActiveOrders() {
        return activeOrders;
    }

    public void setActiveOrders(Map<Integer, BtOrder> activeOrders) {
        this.activeOrders = activeOrders;
    }

    public Boolean getUseAdjustedValues() {
        return useAdjustedValues;
    }

    public void setUseAdjustedValues(Boolean useAdjustedValues) {
        assert barFeed.barsHaveAdjClose();
        this.useAdjustedValues = useAdjustedValues;
    }

    public DefaultStrategy getFillStrategy() {
        return fillStrategy;
    }

    public void setFillStrategy(DefaultStrategy fillStrategy) {
        this.fillStrategy = fillStrategy;
    }

    public BaseBarFeed getBarFeed() {
        return barFeed;
    }

    public void setBarFeed(BaseBarFeed barFeed) {
        this.barFeed = barFeed;
    }

    public Boolean getAllowNegativeCash() {
        return allowNegativeCash;
    }

    public void setAllowNegativeCash(Boolean allowNegativeCash) {
        this.allowNegativeCash = allowNegativeCash;
    }

    public int getNextOrderId() {
        return nextOrderId++;
    }

    public void setNextOrderId(int nextOrderId) {
        this.nextOrderId = nextOrderId;
    }

    IBar getBar(Bars bars, String instrument)
    {
        IBar bar = bars.getBar(instrument);
        if(bar == null)
            bar = barFeed.getLastBar(instrument);
        return bar;
    }


    boolean preProcessOrder(BtOrder order, IBar bar)
    {
        boolean ret = true;
        if(!order.getGoodTillCanceled())
        {
            boolean expired  = bar.getDateTime().after(order.getAcceptedDateTime());
            if(expired)
            {
                ret = false;
                unregisterOrder(order);
                order.switchState(OrderState.canceled);
                notifyOrderEvent(new OrderEvent(order,OrderEventType.canceled,null));
            }
        }
        return ret;
    }


    void postProcessOrder(BtOrder order,IBar bar)
    {
        if(!order.getGoodTillCanceled())
        {
            boolean expired = false;
            if(barFeed.getBarFrequency().getMSecond()>= BarFrequency.DAY.getMSecond())
            {
                expired = bar.getDateTime().after(order.getAcceptedDateTime());
            }
            if(expired)
            {
                unregisterOrder(order);
                order.switchState(OrderState.canceled);
                notifyOrderEvent(new OrderEvent(order,OrderEventType.canceled,null));
            }
        }
    }
    void registerOrder(BtOrder order)
    {
        activeOrders.put(order.getId(),order);
    }
    void unregisterOrder(BtOrder order)
    {
        activeOrders.remove(order.getId());
    }

    @Override
    public IInstrumentTraits getInstrumentTraits(String instrument) {

        return new IntegerTraits();
    }

    @Override
    public double getCash(Boolean includeShort) {
        if(includeShort == null)
            includeShort = true;
        double ret = cash;
        if(!includeShort && barFeed.getCurrentBars()!=null)
        {
            Bars bars = barFeed.getCurrentBars();
            for(Map.Entry<String,Double> entry:shares.entrySet())
            {
                String key = entry.getKey();
                Double value = entry.getValue();
                if(value<0)
                {
                    double instrumentPrice = getBar(bars,key).getClose(getUseAdjustedValues());
                    ret += instrumentPrice*value;
                }
            }
        }
        return ret;
    }

    @Override
    public double getShares(String instrument) {
        if(shares.containsKey(instrument))
            return shares.get(instrument);
        return 0;
    }

    @Override
    public Map<String, Double> getPositions() {
        return shares;
    }

    public List<String> getActiveInstruments()
    {
        List<String> ret = new ArrayList<>();
        for(Map.Entry<String,Double> entry:shares.entrySet())
        {
            String key = entry.getKey();
            double value = entry.getValue();
            if(value!=0)
            {
                ret.add(key);
            }
        }
        return ret;
    }

    @Override
    public List<Order> getActiveOrders(String instrument) {
        if(instrument!=null)
            return activeOrders.values().stream().collect(Collectors.toList());
        else
        {
            return activeOrders.values().stream().filter(x->x.getInstrument()==instrument).collect(Collectors.toList());
        }
    }

    Date getCurrentDateTime()
    {
        return barFeed.getCurrentDateTime();
    }



    @Override
    public void submitOrder(Order order) {
        if(order.isInitial())
        {
            order.setSubmitted(getNextOrderId(),getCurrentDateTime());
            registerOrder((BtOrder) order);
            order.switchState(OrderState.submitted);
            notifyOrderEvent(new OrderEvent(order,OrderEventType.submitted,null));
        }
        else
            assert false;
    }

    @Override
    public BtOrder createMarketOrder(OrderAction action, String instrument, double quantity, Boolean onClose) {
        if(onClose == null)
            onClose = false;
        if(onClose && barFeed.isIntraday())
            assert false;

        return new BtMarketOrder(action,instrument,quantity,onClose,getInstrumentTraits(instrument));
    }

    @Override
    public BtOrder createLimitOrder(OrderAction action, String instrument, double limitPrice, double quantity) {
        return new BtLimitOrder(action,instrument,limitPrice,quantity,getInstrumentTraits(instrument));
    }

    @Override
    public BtOrder createStopOrder(OrderAction action, String instrument, double stopPrice, double quantity) {
        return new BtStopOrder(action,instrument,stopPrice,quantity,getInstrumentTraits(instrument));
    }

    @Override
    public BtOrder createStopLimitOrder(OrderAction action, String instrument, double stopPrice, double limitPrice, double quantity) {
        return new BtStopLimitOrder(action,instrument,stopPrice,limitPrice,quantity,getInstrumentTraits(instrument));
    }

    @Override
    public void cancelOrder(Order order) {
        BtOrder activeOrder = activeOrders.get(order.getId());
        if(activeOrder == null)
        {
            assert  false;
        }
        if(activeOrder.isFilled())
            assert false;
        unregisterOrder(activeOrder);
        activeOrder.switchState(OrderState.canceled);
        notifyOrderEvent(new OrderEvent(activeOrder,OrderEventType.canceled,null));

    }

    public double getEquity() {

        return this.getEquityWithBars(barFeed.getCurrentBars());//getEquityWithBars();
    }

    double getEquityWithBars(Bars bars) {
        double ret = this.getCash(null);
        if(bars!=null)
        {
            for(Map.Entry<String,Double> entry:shares.entrySet())
            {
                String key = entry.getKey();
                double value = entry.getValue();
                double instrumentPrice = getBar(bars,key).getClose(getUseAdjustedValues());
                ret += instrumentPrice*value;
            }
        }
        return ret;
    }

    @Override
    public void start() {

    }

    @Override
    public void stop() {

    }

    @Override
    public void join() {

    }

    @Override
    public boolean eof()
    {
        return barFeed.eof();
    }

    @Override
    public boolean dispatch() {
        return false;
    }

    @Override
    public Date peedDateTime() {
        return null;
    }

    @Override
    public void onDispatcherRegistered(Dispatcher dispatcher) {

    }
    public Date peekDaeTime()
    {
        return null;
    }
}
