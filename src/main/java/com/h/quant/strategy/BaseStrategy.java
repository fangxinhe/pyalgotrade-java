package com.h.quant.strategy;

import java.util.*;

import com.h.quant.Dispatcher;
import com.h.quant.Event;
import com.h.quant.IHandler;
import com.h.quant.barfeed.BaseBarFeed;
import com.h.quant.barfeed.ResampledBarFeed;
import com.h.quant.broker.OrderEvent;
import com.h.quant.data.Bars;
import com.h.quant.data.IBar;
import com.h.quant.broker.Broker;
import com.h.quant.broker.Order;
import com.h.quant.data.DateValues;
import com.h.quant.enums.BarFrequency;
import com.h.quant.enums.OrderAction;
import com.h.quant.strategy.analyzer.IStrategyAnalyzer;

public abstract class BaseStrategy {
    BaseBarFeed barFeed;
    Set<Position> activePositions = new HashSet<>();
    Map<Integer, Position> orderToPosition = new HashMap<>();
    Event barsProcessedEvent = new Event();
    List<IStrategyAnalyzer> analyzers = new ArrayList<>();
    Map<String, IStrategyAnalyzer> namedAnalyzers = new HashMap<String, IStrategyAnalyzer>();
    List<ResampledBarFeed> resampledBarFeeds = new ArrayList<>();
    Broker broker;
    Dispatcher dispatcher = new Dispatcher();

    public BaseStrategy() {

    }

    public void init(Broker broker, BaseBarFeed barFeed) {
        this.broker = broker;
        this.barFeed = barFeed;
        broker.getOrderUpdatedEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                onOrderEvent((OrderEvent) args[0]);
            }
        });

        barFeed.getNewValuesEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                __onBars((DateValues<IBar>) args[0]);
            }
        });

        dispatcher.getStartEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                onStart();
            }
        });

        dispatcher.getIdleEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                __onIdle();
            }
        });

        dispatcher.addSubject(broker);
        dispatcher.addSubject(barFeed);
    }


    void onOrderEvent(OrderEvent orderEvent) {
        Order order = orderEvent.getOrder();
        onOrderUpdated(order);
        Position pos = orderToPosition.get(order.getId());
        if (pos == null)
            return;
        if (!order.isActive()) {
            unregisterPositionOrder(pos, order);
        }
        pos.onOrderEvent(orderEvent);
    }

    public void unregisterPositionOrder(Position position, Order order) {
        orderToPosition.remove(order.getId());
    }

    public void registerPositionOrder(Position position, Order order) {
        activePositions.add(position);
        assert (order.isActive());
        orderToPosition.put(order.getId(), position);
    }

    public void unregisterPosition(Position position) {
        assert !position.isOpen();
        activePositions.remove(position);
    }

    public Broker getBroker() {
        return broker;
    }

    public void setBroker(Broker broker) {
        this.broker = broker;
    }

    public double getPrice() {
        return 1.12354;
    }

//
//    public void buy(double price) {
//        // TODO Auto-generated method stub
//
//    }
//
//
//    public void sell(double price) {
//        // TODO Auto-generated method stub
//
//    }


    public void onStart() {
        // TODO Auto-generated method stub

    }

    public void __onIdle() {
        for (ResampledBarFeed rbf : resampledBarFeeds) {
            rbf.checkNow(getCurrentDateTime());
        }
        onIdle();
    }

    public Date getCurrentDateTime() {
        return barFeed.getCurrentDateTime();
    }

    public void onIdle() {
        // TODO Auto-generated method stub

    }

    public void onEnterOk(Position position) {
        // TODO Auto-generated method stub

    }

    public void onEnterCanceled(Position position) {
        // TODO Auto-generated method stub

    }

    public abstract void onFinish(Bars bars);

    public void onExitCanceled(Position position) {
        // TODO Auto-generated method stub

    }

    public void onExitOk(Position position) {

    }

    public void __notifyAnalyzers(DateValues<IBar> bars) {
        for (IStrategyAnalyzer strategyAnalyzer : analyzers) {
            strategyAnalyzer.beforeOnBars(this, bars);
        }
    }

    public void attachAnalyzer(IStrategyAnalyzer strategyAnalyzer) {
        attachAnalyzerEx(strategyAnalyzer, null);
    }

    void attachAnalyzerEx(IStrategyAnalyzer strategyAnalyzer, String name) {
        if (analyzers.contains(strategyAnalyzer))
            return;
        if (name != null)
            namedAnalyzers.put(name, strategyAnalyzer);
        strategyAnalyzer.beforeAttach(this);
        analyzers.add(strategyAnalyzer);
        strategyAnalyzer.attached(this);
    }

    void __onBars(DateValues<IBar> bars) {
        __notifyAnalyzers(bars);
        onBars(bars.getDateTime(), bars.getDatas());
        barsProcessedEvent.emit(bars);
    }

    public Double getLastPrice(String instrument) {
        Double ret = null;
        IBar bar = getBarFeed().getLastBar(instrument);
        if (bar != null)
            ret = bar.getPrice();
        return ret;
    }

    public abstract void onBars(Date dateTime, Map<String, IBar> bars);


    public void onOrderUpdated(Order order) {
        // TODO Auto-generated method stub

    }

    public void run() {
        dispatcher.run();

        if (barFeed.getCurrentBars() != null)
            onFinish(barFeed.getCurrentBars());
        else
            System.out.println("feed is empty");

    }

    public BaseBarFeed getBarFeed() {
        return barFeed;
    }

    public void setBarFeed(BaseBarFeed barFeed) {
        this.barFeed = barFeed;
    }

    public Set<Position> getActivePositions() {
        return activePositions;
    }

    public void setActivePositions(Set<Position> activePositions) {
        this.activePositions = activePositions;
    }

    public Map<Integer, Position> getOrderToPosition() {
        return orderToPosition;
    }

    public void setOrderToPosition(Map<Integer, Position> orderToPosition) {
        this.orderToPosition = orderToPosition;
    }

    public Event getBarsProcessedEvent() {
        return barsProcessedEvent;
    }

    public void setBarsProcessedEvent(Event barsProcessedEvent) {
        this.barsProcessedEvent = barsProcessedEvent;
    }

    public List<IStrategyAnalyzer> getAnalyzers() {
        return analyzers;
    }

    public void setAnalyzers(List<IStrategyAnalyzer> analyzers) {
        this.analyzers = analyzers;
    }

    public Map<String, IStrategyAnalyzer> getNamedAnalyzers() {
        return namedAnalyzers;
    }

    public IStrategyAnalyzer getNameAnalyzer(String name) {
        return namedAnalyzers.get(name);
    }


    public void setNamedAnalyzers(Map<String, IStrategyAnalyzer> namedAnalyzers) {
        this.namedAnalyzers = namedAnalyzers;
    }

    public List<ResampledBarFeed> getResampledBarFeeds() {
        return resampledBarFeeds;
    }

    public void setResampledBarFeeds(List<ResampledBarFeed> resampledBarFeeds) {
        this.resampledBarFeeds = resampledBarFeeds;
    }

    public Dispatcher getDispatcher() {
        return dispatcher;
    }

    public void setDispatcher(Dispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }


    public double getResult() {
        return broker.getEquity();
    }

    boolean getUseAdjustedValues() {
        return false;
    }

    public Order marketOrder(String instrument, double quantity, Boolean onClose, Boolean gooTillCanceled, Boolean allOrNone) {
        if (onClose == null)
            onClose = false;
        if (gooTillCanceled == null)
            gooTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        Order ret = null;
        if (quantity > 0) {
            ret = getBroker().createMarketOrder(OrderAction.buy, instrument, quantity, onClose);
        } else if (quantity < 0) {
            ret = getBroker().createMarketOrder(OrderAction.sell, instrument, -quantity, onClose);
        }
        if (ret == null)
            return null;
        ret.setGoodTillCanceled(gooTillCanceled);
        ret.setAllOrNone(allOrNone);
        getBroker().submitOrder(ret);
        return ret;
    }

    public Order limitOrder(String instrument, double limitPrice, double quantity, Boolean onClose, Boolean gooTillCanceled, Boolean allOrNone) {
        if (onClose == null)
            onClose = false;
        if (gooTillCanceled == null)
            gooTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        Order ret = null;
        if (quantity > 0) {
            ret = getBroker().createLimitOrder(OrderAction.buy, instrument, limitPrice, quantity);
        } else if (quantity < 0) {
            ret = getBroker().createLimitOrder(OrderAction.sell, instrument, limitPrice, -quantity);
        }
        if (ret == null)
            return null;
        ret.setGoodTillCanceled(gooTillCanceled);
        ret.setAllOrNone(allOrNone);
        getBroker().submitOrder(ret);
        return ret;
    }

    public Order stopOrder(String instrument, double stopPrice, double quantity, Boolean onClose, Boolean gooTillCanceled, Boolean allOrNone) {
        if (onClose == null)
            onClose = false;
        if (gooTillCanceled == null)
            gooTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        Order ret = null;
        if (quantity > 0) {
            ret = getBroker().createStopOrder(OrderAction.buy, instrument, stopPrice, quantity);
        } else if (quantity < 0) {
            ret = getBroker().createStopOrder(OrderAction.sell, instrument, stopPrice, -quantity);
        }
        if (ret == null)
            return null;
        ret.setGoodTillCanceled(gooTillCanceled);
        ret.setAllOrNone(allOrNone);
        getBroker().submitOrder(ret);
        return ret;
    }

    public Order stoplimitOrder(String instrument, double stopPrice, double limitPrice, double quantity, Boolean onClose, Boolean gooTillCanceled, Boolean allOrNone) {
        if (onClose == null)
            onClose = false;
        if (gooTillCanceled == null)
            gooTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        Order ret = null;
        if (quantity > 0) {
            ret = getBroker().createStopLimitOrder(OrderAction.buy, instrument, stopPrice, limitPrice, quantity);
        } else if (quantity < 0) {
            ret = getBroker().createStopLimitOrder(OrderAction.sell, instrument, stopPrice, limitPrice, -quantity);
        }
        if (ret == null)
            return null;
        ret.setGoodTillCanceled(gooTillCanceled);
        ret.setAllOrNone(allOrNone);
        getBroker().submitOrder(ret);
        return ret;
    }

    public Position enterLong(String instrument, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        Position position = new LongPosition(this, instrument, null, null, quantity, goodTillCanceled, allOrNone);
        return position;
    }

    public Position enterShort(String instrument, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new ShortPosition(this, instrument, null, null, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterLongLimit(String instrument, double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new LongPosition(this, instrument, null, limitPrice, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterShortLimit(String instrument, double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new ShortPosition(this, instrument, null, limitPrice, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterLongStop(String instrument, double stopPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new LongPosition(this, instrument, stopPrice, null, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterShortStop(String instrument, double stopPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new ShortPosition(this, instrument, stopPrice, null, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterLongStopLimit(String instrument, double stopPrice, double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new LongPosition(this, instrument, stopPrice, limitPrice, quantity, goodTillCanceled, allOrNone);
    }

    public Position enterShortStopLimit(String instrument, double stopPrice, double limitPrice, double quantity, Boolean goodTillCanceled, Boolean allOrNone) {
        if (goodTillCanceled == null)
            goodTillCanceled = false;
        if (allOrNone == null)
            allOrNone = false;
        return new ShortPosition(this, instrument, stopPrice, limitPrice, quantity, goodTillCanceled, allOrNone);
    }

    public void stop() {
        dispatcher.stop();
    }

    public ResampledBarFeed resampleBarFeed(BarFrequency frequency, IHandler handler) {
        ResampledBarFeed ret = new ResampledBarFeed(getBarFeed(), frequency, null);
        ret.getNewValuesEvent().subscribe(handler);
        getDispatcher().addSubject(ret);
        resampledBarFeeds.add(ret);
        return ret;
    }

}
