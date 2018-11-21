package com.jrj.quant.strategy;

import java.util.*;

import com.jrj.quant.broker.Order;
import com.jrj.quant.broker.OrderEvent;
import com.jrj.quant.broker.OrderExecutionInfo;
import com.jrj.quant.enums.OrderEventType;
import com.jrj.quant.strategy.PositionState.IPostitionState;
import com.jrj.quant.strategy.PositionState.WaitingEntryState;
import com.jrj.quant.strategy.analyzer.PositionTracker;

public class Position {

    IPostitionState state;
    Map<Integer, Order> activeOrders = new HashMap<>();
    double shares;
    BaseStrategy strategy;
    Order entryOrder;
    Date entryDateTime;
    Order exitOrder;
    Date exitDateTime;
    PositionTracker posTracker;
    boolean allOrNone = false;

    public Position(BaseStrategy strategy, Boolean goodTillCanceled, Boolean allOrNone) {

        this.allOrNone = allOrNone;
        switchState(new WaitingEntryState());
        this.strategy = strategy;


    }



    protected void init(Order entryOrder,Boolean goodTillCanceled)
    {
        posTracker = new PositionTracker(entryOrder.getInstrumentTraits());
        switchState(new WaitingEntryState());
        entryOrder.setGoodTillCanceled(goodTillCanceled);
        entryOrder.setAllOrNone(allOrNone);
        submitAndRegisterOrder(entryOrder);
        this.entryOrder = entryOrder;
    }

    void submitAndRegisterOrder(Order order) {
        assert order.isInitial();
        state.canSubmitOrder(this, order);
        getStrategy().getBroker().submitOrder(order);
        activeOrders.put(order.getId(), order);
        getStrategy().registerPositionOrder(this,order);
    }

    public IPostitionState getState() {
        return state;
    }

    public void setState(IPostitionState state) {
        this.state = state;
    }

    public Map<Integer, Order> getActiveOrders() {
        return activeOrders;
    }

    public void setActiveOrders(Map<Integer, Order> activeOrders) {
        this.activeOrders = activeOrders;
    }

    public double getShares() {
        return shares;
    }

    public void setShares(double shares) {
        this.shares = shares;
    }

    public BaseStrategy getStrategy() {
        return strategy;
    }

    public void setStrategy(BaseStrategy strategy) {
        this.strategy = strategy;
    }

    public Order getEntryOrder() {
        return entryOrder;
    }

    public void setEntryOrder(Order entryOrder) {
        this.entryOrder = entryOrder;
    }

    public Date getEntryDateTime() {
        return entryDateTime;
    }

    public void setEntryDateTime(Date entryDateTime) {
        this.entryDateTime = entryDateTime;
    }

    public Order getExitOrder() {
        return exitOrder;
    }

    public void setExitOrder(Order exitOrder) {
        this.exitOrder = exitOrder;
    }

    public Date getExitDateTime() {
        return exitDateTime;
    }

    public void setExitDateTime(Date exitDateTime) {
        this.exitDateTime = exitDateTime;
    }

    public PositionTracker getPosTracker() {
        return posTracker;
    }

    public void setPosTracker(PositionTracker posTracker) {
        this.posTracker = posTracker;
    }

    public boolean isAllOrNone() {
        return allOrNone;
    }

    public void setAllOrNone(boolean allOrNone) {
        this.allOrNone = allOrNone;
    }

    public void onEnter() {
        state.onEnter(this);
    }

    public void canSubmitOrder(Order order) {

        state.canSubmitOrder(this, order);

    }

    public Order buildExitOrder(Double stopPrice, Double limitPrice) {
        //// TODO: 2016/11/25
        return null;
    }


    public boolean isOpen() {

        return state.isOpen(this);
    }

    public void exit(Double stopPrice, Double limitPrice, Boolean goodTillCanceled) {
        state.exit(this, stopPrice, limitPrice, goodTillCanceled);
    }

    public void switchState(IPostitionState newState) {
        state = newState;
        state.onEnter(this);
    }

    public Double getLastPrice() {
        return strategy.getLastPrice(getInstrument());
    }


    public String getInstrument() {
        return entryOrder.getInstrument();
    }

    public boolean isEntryActive() {
        return entryOrder != null && entryOrder.isActive();
    }

    public boolean isEntryFilled() {
        return entryOrder != null && entryOrder.isFilled();
    }

    public boolean isExitActive() {
        return exitOrder != null && exitOrder.isActive();
    }

    public boolean isExitFilled() {
        return exitOrder != null && exitOrder.isFilled();
    }

    public double getReturn(Boolean includeCommissions) {
        if (includeCommissions == null)
            includeCommissions = true;
        double ret = 0;
        Double price = getLastPrice();
        if (price == null)
            return ret;
        ret = posTracker.getReturn(price, includeCommissions);
        return ret;
    }

    public double getPnL(Boolean includeCommissions) {
        if (includeCommissions == null)
            includeCommissions = true;
        double ret = 0;
        Double price = getLastPrice();
        if (price == null)
            return ret;
        ret = posTracker.getPnL(price, includeCommissions);
        return ret;
    }

    public void cancelEntry() {
        if (isEntryActive())
            getStrategy().getBroker().cancelOrder(getEntryOrder());
    }

    public void cancelExit() {
        if (isEntryActive())
            getStrategy().getBroker().cancelOrder(getExitOrder());
    }

    public void exitMarket(Boolean goodTillCanceled) {
        state.exit(this, null, null, goodTillCanceled);
    }

    public void exitLimit(Double limitPrice, Boolean goodTillCanceled) {
        state.exit(this, null, limitPrice, goodTillCanceled);
    }

    public void exitStop(Double stopPrice, Boolean goodTillCanceled) {
        state.exit(this, stopPrice, null, goodTillCanceled);
    }

    public void exitStopLimit(double stopPrice, double limitPrice, Boolean goodTillCanceled) {
        state.exit(this, stopPrice, limitPrice, goodTillCanceled);
    }

    public void submitExitOrder(double stopPrice, double limitPrice, Boolean goodTillCanceled) {
        assert !isExitActive();
        Order exitOrder = buildExitOrder(stopPrice, limitPrice);
        if (goodTillCanceled == null)
            goodTillCanceled = entryOrder.getGoodTillCanceled();
        exitOrder.setGoodTillCanceled(goodTillCanceled);
        exitOrder.setAllOrNone(allOrNone);
        submitAndRegisterOrder(exitOrder);
        this.exitOrder = exitOrder;
    }

    public void onOrderEvent(OrderEvent orderEvent) {
        updatePosTracker(orderEvent);
        Order order = orderEvent.getOrder();
        if (!order.isActive())
            activeOrders.remove(order.getId());
        if (orderEvent.getOrderEventType() == OrderEventType.partiallyFilled || orderEvent.getOrderEventType() == OrderEventType.filled) {
            OrderExecutionInfo execInfo = orderEvent.getEventInfo();
            if (order.isBuy()) {
                shares = order.getInstrumentTraits().roundQuantity(shares + execInfo.getQuantity());
            } else {
                shares = order.getInstrumentTraits().roundQuantity(shares - execInfo.getQuantity());
            }
        }
        state.onOrderEvent(this, orderEvent);
    }

    void updatePosTracker(OrderEvent orderEvent) {
        if (orderEvent.getOrderEventType() == OrderEventType.filled || orderEvent.getOrderEventType() == OrderEventType.partiallyFilled) {
            Order order = orderEvent.getOrder();
            OrderExecutionInfo execInfo = orderEvent.getEventInfo();
            if (order.isBuy()) {
                posTracker.buy(execInfo.getQuantity(), execInfo.getPrice(), execInfo.getCommission());
            } else {
                posTracker.sell(execInfo.getQuantity(), execInfo.getPrice(), execInfo.getCommission());
            }
        }
    }

    public long getAge() {
        long ret = 0;
        Date last = null;
        if (entryDateTime == null)
            return ret;
        if (exitDateTime != null) {
            last = exitDateTime;
        } else last = entryDateTime;

        ret = last.getTime() - entryDateTime.getTime();
        return ret;
    }


}
