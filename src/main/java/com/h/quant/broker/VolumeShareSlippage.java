package com.h.quant.broker;

import com.h.quant.data.IBar;

public class VolumeShareSlippage implements ISlippageModel {

    public VolumeShareSlippage(Double priceImpact) {
        super();
        if (priceImpact != null)
            this.priceImpact = priceImpact;
    }

    double priceImpact = 0.1;

    @Override
    public double calculatePrice(Order order, double price, double quantity, IBar bar, double volumeUsed) {

        double ret = 0.0d;
        double totalVolume = volumeUsed + quantity;
        double volumeShare = totalVolume / bar.getVolume();
        double impactPct = volumeShare * volumeShare * priceImpact;
        if (order.isBuy())
            ret = price * (1 + impactPct);
        else
            ret = price * (1 - impactPct);

        return ret;
    }

    public double getPriceImpact() {
        return priceImpact;
    }

    public void setPriceImpact(double priceImpact) {
        this.priceImpact = priceImpact;
    }

}
