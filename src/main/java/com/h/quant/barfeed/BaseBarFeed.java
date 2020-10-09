package com.h.quant.barfeed;

import com.h.quant.dataseries.BarDataSeries;
import com.h.quant.exceptions.QuantException;
import com.h.quant.data.Bars;
import com.h.quant.data.IBar;
import com.h.quant.enums.BarFrequency;
import com.h.quant.enums.BarSize;
import com.h.quant.feed.BaseFeed;
import com.h.quant.feed.IDataReciver;
import com.h.quant.data.DateValues;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by hefangxin on 2016/11/22.
 */
public abstract class BaseBarFeed extends BaseFeed<IBar> {

    protected BarFrequency barFrequency = BarFrequency.DAY;
    boolean useAdjustedValues = false;
    String defaultInstrument = null;
    Bars currentBars;
    Bars lastBars = new Bars(null);

    public BaseBarFeed(Integer maxLen, BarFrequency barFrequency) {
        super(maxLen);
        this.barFrequency = barFrequency;
    }

    public BaseBarFeed(int maxLen) {
        super(maxLen);
    }

    public void reset() {
        currentBars = null;
        lastBars = null;
        super.reset();
    }

    public void setUseAdjustedValues(boolean useAdjusted)  {
        if (useAdjusted && !barsHaveAdjClose()) {
            assert false;
        }

        useAdjustedValues = useAdjusted;
        for (String instrument : getRegisteredInstruments()) {
            ((BarDataSeries) get(instrument)).setUseAdjustedValues(useAdjusted);
        }
    }

    public abstract Date getCurrentDateTime();

    public abstract boolean barsHaveAdjClose();

    public abstract Bars getNextBars();

    public BarDataSeries createDataSeries(String key, int maxLen) {
        BarDataSeries ret = new BarDataSeries(maxLen);

        ret.setUseAdjustedValues(useAdjustedValues);
        return ret;
    }

    @Override
    public DateValues<IBar> getNextValues() throws QuantException {
        Date dateTime = null;
        Bars bars = getNextBars();
        if (bars == null) {
            return null;
        }
        dateTime = bars.getDatetime();
        if (currentBars != null && currentBars.getDatetime().after(dateTime)) {
            throw new QuantException("");
        }
        currentBars = bars;
        for (String instrument : bars.getInstruments()) {
            lastBars.setBar(instrument, bars.getBar(instrument));
        }
        DateValues<IBar> ret = new DateValues<>(dateTime, bars.getBars());
        return ret;
    }

    Set<String> getRegisteredInstruments() {
        return getKeys();
    }

    @Override
    public List<IBar> getData(Date startDate, Date endDate, String instrument, BarSize barSize) {
        return null;
    }

    @Override
    public void getDataAsyn(Date startDate, Date endDate, String instrument, BarSize barSize, IDataReciver dataReciver) {

    }

    public BarFrequency getBarFrequency() {
        return barFrequency;
    }

    public void setBarFrequency(BarFrequency barFrequency) {
        this.barFrequency = barFrequency;
    }

    public boolean isUseAdjustedValues() {
        return useAdjustedValues;
    }

    public String getDefaultInstrument() {
        return defaultInstrument;
    }

    public void setDefaultInstrument(String defaultInstrument) {
        this.defaultInstrument = defaultInstrument;
    }

    public Bars getCurrentBars() {
        return currentBars;
    }

    public void setCurrentBars(Bars currentBars) {
        this.currentBars = currentBars;
    }

    public Bars getLastBars() {
        return lastBars;
    }
    public IBar getLastBar(String instrument)
    {
        return lastBars.getBar(instrument);
    }

    public void setLastBars(Bars lastBars) {
        this.lastBars = lastBars;
    }

    public void registerInstrument(String instrument) {
        defaultInstrument = instrument;
        registerDataSeries(instrument);
    }

    BarDataSeries getDataSeries(String instrument) {
        if (instrument == null)
            instrument = defaultInstrument;
        return (BarDataSeries) get(instrument);
    }


    public boolean isIntraday() {

        return barFrequency.getMSecond() < BarFrequency.DAY.getMSecond();
    }




}
