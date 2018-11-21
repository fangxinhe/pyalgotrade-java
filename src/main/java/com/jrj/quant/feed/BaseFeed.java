package com.jrj.quant.feed;

import java.util.*;

import com.jrj.quant.Event;
import com.jrj.quant.Subject;
import com.jrj.quant.enums.BarSize;
import com.jrj.quant.dataseries.IDataSeries;
import com.jrj.quant.exceptions.QuantException;
import com.jrj.quant.data.DateValues;

public abstract class BaseFeed<T> extends Subject {

    protected int maxLen;
    Map<String, IDataSeries> dataSeriesMap = null;
    Event event = new Event();

    public BaseFeed(Integer maxLen) {
        if(maxLen == null)
            maxLen = 10240;
        this.maxLen = maxLen;
        this.dataSeriesMap = new HashMap<>();
    }

    public abstract IDataSeries createDataSeries(String key, int maxLen);

    public abstract List<T> getData(Date startDate, Date endDate, String instrument, BarSize barSize);

    public abstract void getDataAsyn(Date startDate, Date endDate, String instrument, BarSize barSize, IDataReciver dataReciver);

    public void reset() {
        Set<String> keys = dataSeriesMap.keySet();
        dataSeriesMap.clear();
        for (String key : keys) {
            registerDataSeries(key);
        }
    }

    public void registerDataSeries(String key) {
        if (!dataSeriesMap.containsKey(key)) {
            dataSeriesMap.put(key, createDataSeries(key, maxLen));
        }
    }

    public abstract DateValues<T> getNextValues() throws QuantException;

    public DateValues<T> getNextValuesAndUpdateDS() throws QuantException {
        DateValues<T> dateValues = getNextValues();
        if (dateValues.getDateTime() != null) {
            for (Map.Entry<String, T> entry : dateValues.getDatas().entrySet()) {
                String key = entry.getKey();
                T value = entry.getValue();
                IDataSeries IDataSeries = dataSeriesMap.get(key);
                if (IDataSeries == null)
                    continue;
                IDataSeries.addData(dateValues.getDateTime(), value);
            }
        }
        return dateValues;
    }

    public boolean dispatch()   {
        DateValues<T> dateValues = null;
        try {
            dateValues = getNextValuesAndUpdateDS();
        } catch (QuantException e) {
            e.printStackTrace();
        }
        if (dateValues == null) {
            return false;
        }
        if(dateValues.getDateTime()!=null)
        {
            event.emit(dateValues);
            return true;
        }


        return false;
    }

    protected Set<String> getKeys() {
        return dataSeriesMap.keySet();
    }

    public IDataSeries get(String instrument) {
        return dataSeriesMap.get(instrument);
    }

    public Event getNewValuesEvent()
    {
        return event;
    }


}

