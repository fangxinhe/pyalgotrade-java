package com.h.quant.barfeed;

import com.h.quant.exceptions.QuantException;
import com.h.quant.resampled.Grouper;
import com.h.quant.data.BasicBar;
import com.h.quant.data.IBar;
import com.h.quant.enums.BarFrequency;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class BarGrouper extends Grouper<IBar,BasicBar> {


    double open;
    double high;
    double low;
    double close;
    double volume;
    double adjClose;
    BarFrequency frequency;
    boolean useAdjustedValue = false;


    public BarGrouper(Date groupDateTime,IBar bar ,BarFrequency frequency) {
        super(groupDateTime);
        this.open = bar.getOpen(null);
        this.high = bar.getHigh(null);
        low = bar.getLow(null);
        close = bar.getClose(null);
        volume = bar.getVolume();
        adjClose = bar.getAdjClose();
        useAdjustedValue = bar.getUseAdjValue();
        this.frequency = frequency;


    }

    @Override
    public void addValue(IBar bar) {

        this.open = bar.getOpen(null);
        this.high = bar.getHigh(null);
        low = bar.getLow(null);
        close = bar.getClose(null);
        volume = bar.getVolume();
        adjClose = bar.getAdjClose();

    }

    @Override
    public BasicBar getGrouped() {
        try {
            BasicBar bar = new BasicBar(getDateTime(),open,high,low,close,volume,adjClose,frequency);
            return bar;
        } catch (QuantException e) {
            return null;
        }
    }
}
