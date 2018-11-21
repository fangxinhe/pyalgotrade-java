package com.jrj.quant.broker;

import java.util.Date;

import com.jrj.quant.enums.OrderAction;
import com.jrj.quant.enums.OrderState;
import com.jrj.quant.enums.OrderType;
import com.jrj.quant.exceptions.QuantException;

public class Order {

    Integer id;// 订单ID

    //@Enumerated(EnumType.ORDINAL)
    OrderType type;// 订单类型

    //@Enumerated(EnumType.ORDINAL)
    OrderAction action;// 订单方向
    OrderState state = OrderState.initial;// OrderState
    String instrument;// 证券号
    Double quantity;// 数量

    IInstrumentTraits instrumentTraits;

    Date submitDateTime;
    Double filled = 0.0d;
    Double avgFillPrice;

    Boolean onClose;
    // 长期委托
    Boolean goodTillCanceled = false;//

    Double commissions = 0.0d;
    Boolean allOrNone = false;
    Double limitPrice;
    Double stopPrice;
    boolean stopHit = false;
    OrderExecutionInfo executionInfo;


    public IInstrumentTraits getInstrumentTraits() {
        return instrumentTraits;
    }

    public void setInstrumentTraits(IInstrumentTraits instrumentTraits) {
        this.instrumentTraits = instrumentTraits;
    }

    public OrderExecutionInfo getExecutionInfo() {
        return executionInfo;
    }

    public void setExecutionInfo(OrderExecutionInfo executionInfo) {
        this.executionInfo = executionInfo;
    }

    public Order(OrderType type, OrderAction action, String instrument, Double quantity, IInstrumentTraits instrumentTraits) {
        super();
        this.type = type;
        this.action = action;
        this.instrument = instrument;
        this.quantity = quantity;
        this.instrumentTraits = instrumentTraits;
    }

    public Order(Integer id, OrderType type, OrderAction action, OrderState state, String instrument, Double quantity,
                 Date submitDateTime, Double filled, Double avgFillPrice, Boolean goodTillCanceled, Double commissions,
                 Boolean allOrNone) {
        super();
        this.id = id;
        this.type = type;
        this.action = action;
        this.state = state;
        this.instrument = instrument;
        this.quantity = quantity;
        this.submitDateTime = submitDateTime;
        this.filled = filled;
        this.avgFillPrice = avgFillPrice;
        this.goodTillCanceled = goodTillCanceled;
        this.commissions = commissions;
        this.allOrNone = allOrNone;
    }

    public Double getLimitPrice() {
        return limitPrice;
    }

    public void setLimitPrice(Double limitPrice) {
        this.limitPrice = limitPrice;
    }

    public Double getStopPrice() {
        return stopPrice;
    }

    public void setStopPrice(Double stopPrice) {
        this.stopPrice = stopPrice;
    }

    public Double getCommissions() {
        return commissions;
    }

    public void setCommissions(Double commissions) {
        this.commissions = commissions;
    }

    public Boolean getAllOrNone() {
        return allOrNone;
    }

    public void setAllOrNone(Boolean allOrNone) {
        this.allOrNone = allOrNone;
    }

    public boolean isActive() {
        return state != OrderState.canceled && state != OrderState.filled;
    }

    public boolean isInitial() {
        return state == OrderState.initial;
    }

    public boolean isSubmitted() {
        return state == OrderState.submitted;
    }

    public boolean isAccepted() {
        return state == OrderState.accepted;
    }

    public boolean isCanceled() {
        return state == OrderState.canceled;
    }

    public boolean isPartiallyFilled() {
        return state == OrderState.partiallyFilled;
    }

    public boolean isFilled() {
        return state == OrderState.filled;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public OrderType getType() {
        return type;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public OrderAction getAction() {
        return action;
    }

    public void setAction(OrderAction action) {
        this.action = action;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Date getSubmitDateTime() {
        return submitDateTime;
    }

    public void setSubmitDateTime(Date submitDateTime) {
        this.submitDateTime = submitDateTime;
    }
    public void setSubmitted(Integer orderId,Date dateTime)
    {
        id=orderId;
        submitDateTime = dateTime;
    }

    public Double getFilled() {
        return filled;
    }

    public void setFilled(Double filled) {
        this.filled = filled;
    }

    public Double getAvgFillPrice() {
        return avgFillPrice;
    }

    public void setAvgFillPrice(Double avgFillPrice) {
        this.avgFillPrice = avgFillPrice;
    }

    public Boolean getGoodTillCanceled() {
        return goodTillCanceled;
    }

    public void setGoodTillCanceled(Boolean goodTillCanceled) {
        this.goodTillCanceled = goodTillCanceled;
    }

    public void switchState(OrderState newState) {
        if (!OrderState.isValidTransition(state, newState)) {
            assert false;
        }
        this.setState(newState);
    }

    public boolean isBuy() {
        return action == OrderAction.buy || action == OrderAction.buyToCover;
    }

    public boolean isSell() {
        return action == OrderAction.sell || action == OrderAction.sellShort;
    }

    public Boolean getOnClose() {
        return onClose;
    }

    public void setOnClose(Boolean onClose) {
        this.onClose = onClose;
    }

    public static Order buildMarketOrder(OrderType type, OrderAction action, String instrument, Double quantity,
                                         Boolean onClose) {
        Order order = new Order(type, action, instrument, quantity, null);
        order.setOnClose(onClose);
        return order;
    }

    public static Order buildLimitOrder(OrderType type, OrderAction action, String instrument, Double quantity,
                                        Double limitPrice) {
        Order order = new Order(type, action, instrument, quantity, null);
        order.setLimitPrice(limitPrice);
        return order;
    }

    public static Order buildStopOrder(OrderType type, OrderAction action, String instrument, Double quantity,
                                       Double stopPrice) {
        Order order = new Order(type, action, instrument, quantity, null);
        order.setStopPrice(stopPrice);
        return order;
    }


    public double getRemaining() {
        return instrumentTraits.roundQuantity(quantity - filled);
    }

    public void addExecutionInfo(OrderExecutionInfo orderExecutionInfo) {
        assert (orderExecutionInfo.getQuantity() <= getRemaining());
        if (avgFillPrice == null) {
            avgFillPrice = orderExecutionInfo.getPrice();
        } else {
            avgFillPrice = (avgFillPrice * filled + orderExecutionInfo.getPrice() * orderExecutionInfo.getQuantity()) / (filled + orderExecutionInfo.getQuantity());
        }
        executionInfo = orderExecutionInfo;
        filled = getInstrumentTraits().roundQuantity(filled + orderExecutionInfo.getQuantity());
        this.commissions += orderExecutionInfo.getCommission();
        if(getRemaining()==0)
        {
            switchState(OrderState.filled);
        }
        else
        {
            assert !allOrNone;
            switchState(OrderState.partiallyFilled);
        }

    }

}
