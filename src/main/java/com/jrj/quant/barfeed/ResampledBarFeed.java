package com.jrj.quant.barfeed;

import com.jrj.quant.Dispatcher;
import com.jrj.quant.IHandler;
import com.jrj.quant.data.Bars;
import com.jrj.quant.enums.BarFrequency;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.resampled.RangeFactory;
import com.jrj.quant.resampled.TimeRange;

import java.util.*;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class ResampledBarFeed extends BaseBarFeed {


    Queue<Bars> values = new LinkedList<>();
    BaseBarFeed barFeed;
    BarsGrouper grouper = null;
    TimeRange range = null;

    public ResampledBarFeed(BaseBarFeed barFeed, BarFrequency barFrequency, Integer maxLen) {
        super(maxLen, barFrequency);
        barFeed.getRegisteredInstruments().forEach(this::registerInstrument);
        this.barFeed = barFeed;
        barFeed.getNewValuesEvent().subscribe(new IHandler() {
            @Override
            public void update(Object... args) {
                Date dateTime = (Date) args[0];
                DateValues dateValues = (DateValues) args[1];

                if (range == null) {
                    range = RangeFactory.buildRange(dateTime, getBarFrequency().getMSecond());
                    grouper = new BarsGrouper(range.getBeginning(), dateValues, getBarFrequency());
                } else if (range.belongs(dateTime)) {
                    grouper.addValue(dateValues);
                } else {
                    values.offer(grouper.getGrouped());
                    range = RangeFactory.buildRange(dateTime, getBarFrequency().getMSecond());
                    grouper = new BarsGrouper(range.getBeginning(), dateValues, getBarFrequency());
                }
            }
        });

    }


    @Override
    public Date getCurrentDateTime() {
        return barFeed.getCurrentDateTime();
    }

    @Override
    public boolean barsHaveAdjClose() {
        return barFeed.barsHaveAdjClose();
    }

    @Override
    public Bars getNextBars() {
        if (values.isEmpty())
            return null;
        return values.poll();
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
    public boolean eof() {
        return values.isEmpty();
    }

    @Override
    public Date peedDateTime() {
        return null;
    }

    @Override
    public void onDispatcherRegistered(Dispatcher dispatcher) {

    }

    public void checkNow(Date dateTime) {
        if(range!=null && !range.belongs(dateTime))
        {
            values.offer(grouper.getGrouped());
            grouper = null;
            range = null;
        }
    }


}
