package com.h.quant.broker;

import com.h.quant.broker.backtesting.BtStopLimitOrder;
import com.h.quant.broker.backtesting.BtStopOrder;
import com.h.quant.data.IBar;
import com.h.quant.enums.BarFrequency;
import com.h.quant.enums.OrderAction;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.DoubleAccumulator;

/**
 * Created by hefangxin on 2016/11/25.
 */
public class DefaultStrategy implements FillStrategy {
    Map<String, Double> volumeLeft = new HashMap<>();
    Map<String, Double> volumeUsed = new HashMap<>();
    Double volumeLimit = 0.25;
    ISlippageModel slippageModel;

    public DefaultStrategy(Double volumeLimit) {
        setVolumeLimit(volumeLimit);
        setSlippageModel(new NoSlippage());

    }

    public Map<String, Double> getVolumeLeft() {
        return volumeLeft;
    }

    public void setVolumeLeft(Map<String, Double> volumeLeft) {
        this.volumeLeft = volumeLeft;
    }

    public Map<String, Double> getVolumeUsed() {
        return volumeUsed;
    }

    public void setVolumeUsed(Map<String, Double> volumeUsed) {
        this.volumeUsed = volumeUsed;
    }

    public double getVolumeLimit() {
        return volumeLimit;
    }

    public void setVolumeLimit(Double volumeLimit) {
        if (volumeLimit != null) {
            assert volumeLimit > 0 && volumeLimit <= 1;

        }
        this.volumeLimit = volumeLimit;
    }

    public ISlippageModel getSlippageModel() {
        return slippageModel;
    }

    public void setSlippageModel(ISlippageModel slippageModel) {
        this.slippageModel = slippageModel;
    }

    @Override
    public void onBars(Broker broker, Map<String, IBar> bars) {
        Map<String, Double> volumeLeft = new HashMap<>();
        for (Map.Entry<String, IBar> entry : bars.entrySet()) {
            String instrument = entry.getKey();
            IBar bar = entry.getValue();
            if (bar.getFrequency() == BarFrequency.TRADE) {
                volumeLeft.put(instrument, bar.getVolume());
            } else if (volumeLimit != null) {
                volumeLeft.put(instrument, bar.getVolume() * volumeLimit);
            }
            volumeUsed.put(instrument, 0.0);

        }
        this.volumeLeft = volumeLeft;
    }

    @Override
    public void onOrderFilled(Broker broker, Order order) {
        if (volumeLimit != null) {
            double volumeLeft = order.getInstrumentTraits().roundQuantity(this.volumeLeft.get(order.getInstrument()));
            double fillQuantity = order.getExecutionInfo().getQuantity();
            assert volumeLeft >= fillQuantity;
            this.volumeLeft.put(order.getInstrument(), order.getInstrumentTraits().roundQuantity(volumeLeft - fillQuantity));
        }
        volumeUsed.put(order.getInstrument(), order.getInstrumentTraits().roundQuantity(volumeUsed.get(order.getInstrument()) - order.getExecutionInfo().getQuantity()));
    }

    @Override
    public FillInfo fillMarketOrder(Broker broker, Order order, IBar bar) {
        double fillSize = calculateFillSize(broker, order, bar);
        if (fillSize == 0) {
            System.out.println("手数不足");
            return null;
        }
        Double price = null;
        if (order.getOnClose()) {
            price = bar.getClose(broker.isUseAdjustedValue());
        } else
            price = bar.getOpen(broker.isUseAdjustedValue());
        assert price != null;
        if (bar.getFrequency() != BarFrequency.TRADE) {
            price = slippageModel.calculatePrice(order, price, fillSize, bar, volumeUsed.get(order.getInstrument()));
        }
        return new FillInfo(price, fillSize);
    }

    Double get_limit_price_trigger(OrderAction action, double limitPrice, Boolean useAdjustedValues, IBar bar) {
        Double ret = null;
        double open = bar.getOpen(useAdjustedValues);
        double high = bar.getHigh(useAdjustedValues);
        double low = bar.getLow(useAdjustedValues);
        if (action == OrderAction.buy || action == OrderAction.buyToCover) {
            if (high < limitPrice) {
                ret = open;
            } else if (limitPrice >= low) {
                if (open < limitPrice)
                    ret = open;
                else
                    ret = limitPrice;
            }
        } else if (action == OrderAction.sell || action == OrderAction.sellShort) {
            if (low > limitPrice) {
                ret = open;
            } else if (limitPrice <= high) {
                if (open > limitPrice)
                    ret = open;
                else
                    ret = limitPrice;
            }
        } else {
            assert false;
        }
        return ret;

    }

    double get_stop_price_trigger(OrderAction action, double stopPrice, Boolean useAdjustedValues, IBar bar) {
        Double ret = null;
        double open = bar.getOpen(useAdjustedValues);
        double high = bar.getHigh(useAdjustedValues);
        double low = bar.getLow(useAdjustedValues);

        if (action == OrderAction.buy || action == OrderAction.buyToCover) {
            if (low > stopPrice) {
                ret = open;
            } else if (stopPrice <= high) {
                if (open > stopPrice)
                    ret = open;
                else
                    ret = stopPrice;
            }
        }
        else if(action == OrderAction.sell || action == OrderAction.sellShort)
        {
            if(high< stopPrice)
                ret =open;
            else if(stopPrice>=low)
            {
                if(open < stopPrice)
                    ret = open;
                else
                    ret = stopPrice;
            }
        }
        else
        assert false;
        return ret;

    }


    @Override
    public FillInfo fillLimitOrder(Broker broker, Order order, IBar bar) {
        double fillSize = calculateFillSize(broker, order, bar);
        if (fillSize == 0) {
            return null;
        }
        FillInfo ret = null;
        Double price = get_limit_price_trigger(order.getAction(),order.getLimitPrice(),broker.isUseAdjustedValue(),bar);
        if(price!=null)
            ret = new FillInfo(price,fillSize);
        return ret;
    }

    @Override
    public FillInfo fillStopOrder(Broker broker, Order order, IBar bar) {
        FillInfo ret = null;
        Double stopPriceTrigger = null;
        BtStopOrder stopOrder = (BtStopOrder) order;
        double fillSize = 0;
        if(!stopOrder.isStopHit())
        {
            stopPriceTrigger = get_stop_price_trigger(order.getAction(),order.getStopPrice(),broker.isUseAdjustedValue(),bar);
            stopOrder.setStopHit(stopPriceTrigger!=null);
        }
        if(((BtStopOrder) order).isStopHit())
        {
            fillSize = calculateFillSize(broker,order,bar);
            if(fillSize==0)
            {
                //log
                return null;
            }
        }
        Double price = null;
        if(stopPriceTrigger!=null)
            price = stopPriceTrigger;
        else
            price = bar.getOpen(broker.isUseAdjustedValue());
        assert price!=null;
        if(bar.getFrequency()!=BarFrequency.TRADE)
        {
            price = slippageModel.calculatePrice(order,price,fillSize,bar,volumeUsed.get(order.getInstrument()));
        }
        ret = new FillInfo(price,fillSize);
        return ret;

    }

    @Override
    public FillInfo fillStopLimitOrder(Broker broker, Order order, IBar bar) {
        FillInfo ret = null;
        Double stopPriceTrigger = null;
        BtStopLimitOrder btStopLimitOrder = (BtStopLimitOrder) order;
        if(!btStopLimitOrder.isStopHit())
        {
            stopPriceTrigger = get_stop_price_trigger(order.getAction(),order.getStopPrice(),broker.isUseAdjustedValue(),bar);
        }
        btStopLimitOrder.setStopHit(stopPriceTrigger!=null);
        if(btStopLimitOrder.isStopHit())
        {
            double fillSize = calculateFillSize(broker,order,bar);
            if(fillSize==0)
            {
                return null;
            }
            Double price = get_limit_price_trigger(order.getAction(),order.getLimitPrice(),broker.isUseAdjustedValue(),bar);
            if(price!=null)
            {
                if(stopPriceTrigger !=null)
                {
                    if(order.isBuy())
                    {
                        price = Math.min(stopPriceTrigger,order.getLimitPrice());
                    }
                    else
                    {
                        price = Math.max(stopPriceTrigger,order.getLimitPrice());
                    }
                }
                ret = new FillInfo(price,fillSize);
            }
        }
        return ret;


    }

    double calculateFillSize(Broker broker, Order order, IBar bar) {
        double ret = 0;
        double maxVolume = 0;
        if (volumeLimit != null) {
            if (volumeLeft.containsKey(order.getInstrument())) {
                maxVolume = volumeLeft.get(order.getInstrument());
            }
            maxVolume = order.getInstrumentTraits().roundQuantity(maxVolume);
        } else {
            maxVolume = order.getRemaining();
        }
        if (!order.getAllOrNone()) {
            ret = Math.min(maxVolume, order.getRemaining());
        } else {
            ret = order.getRemaining();
        }
        return ret;
    }


}
