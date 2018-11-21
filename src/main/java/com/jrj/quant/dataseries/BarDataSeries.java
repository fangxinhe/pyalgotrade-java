package com.jrj.quant.dataseries;

import com.jrj.quant.data.IBar;
import com.jrj.quant.data.NewDataListener;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class BarDataSeries extends SequenceDataSeries<IBar> {

    IDataSeries<Double> openDs = new SequenceDataSeries<>(maxLen);
    IDataSeries<Double> closeDs = new SequenceDataSeries<>(maxLen);
    IDataSeries<Double> highDs = new SequenceDataSeries<>(maxLen);
    IDataSeries<Double> lowDs = new SequenceDataSeries<>(maxLen);
    IDataSeries<Double> volumeDs = new SequenceDataSeries<>(maxLen);
    IDataSeries<Double> adjCloseDs = new SequenceDataSeries<>(maxLen);
    boolean useAdjustedValues = false;
    Map<String,IDataSeries> extraDs = new HashMap<>();

    public BarDataSeries(int maxLen) {
        super(maxLen);
    }



    public void setUseAdjustedValues(boolean useAdjustedValues) {
        this.useAdjustedValues = useAdjustedValues;
    }

    public void append(IBar bar) {
        addData(bar.getDateTime(),bar);
    }
    IDataSeries<?> getOrCreateExtraDS(String name)
    {
        if(extraDs.containsKey(name))
        {
            return extraDs.get(name);
        }
        else
        {
            IDataSeries<Object> ds = new SequenceDataSeries<Object>(maxLen);
            extraDs.put(name,ds);
            return ds;
        }
    }


    @Override
    public void addData(Date dateTime, IBar bar) {
        bar.setUseAdjustedValue(this.useAdjustedValues);
        super.addData(dateTime, bar);
        openDs.addData(dateTime,bar.getOpen(null));
        closeDs.addData(dateTime,bar.getClose(null));
        highDs.addData(dateTime,bar.getHigh(null));
        lowDs.addData(dateTime,bar.getLow(null));
        volumeDs.addData(dateTime,bar.getVolume());
        for(Map.Entry<String,Object> entry:bar.getExtraColumns().entrySet()){
            IDataSeries ds = getOrCreateExtraDS(entry.getKey());
            ds.addData(dateTime,entry.getValue());
        }
    }

    public IDataSeries<Double> getOpenDs() {
        return openDs;
    }

    public IDataSeries<Double> getCloseDs() {
        return closeDs;
    }

    public IDataSeries<Double> getHighDs() {
        return highDs;
    }

    public IDataSeries<Double> getLowDs() {
        return lowDs;
    }

    public IDataSeries<Double> getVolumeDs() {
        return volumeDs;
    }

    public IDataSeries<Double> getAdjCloseDs() {
        return adjCloseDs;
    }

    public boolean isUseAdjustedValues() {
        return useAdjustedValues;
    }

    public Object getExtraDs(String name) {
        return extraDs.get(name);
    }
}
