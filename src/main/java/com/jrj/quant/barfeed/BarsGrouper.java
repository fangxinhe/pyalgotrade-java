package com.jrj.quant.barfeed;

import com.jrj.quant.data.Bars;
import com.jrj.quant.data.IBar;
import com.jrj.quant.enums.BarFrequency;
import com.jrj.quant.exceptions.QuantException;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.resampled.Grouper;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class BarsGrouper extends Grouper<DateValues<IBar>,Bars> {
    Map<String,BarGrouper> barGroupers = new HashMap<>();
    BarFrequency frequency;
    public BarsGrouper(Date groupDateTime, DateValues<IBar> bars, BarFrequency frequency) {
        super(groupDateTime);
        this.frequency = frequency;
        for(Map.Entry<String,IBar> entry:bars.getDatas().entrySet())
        {
            String key  = entry.getKey();
            IBar value = entry.getValue();
            BarGrouper barGrouper = new BarGrouper(groupDateTime,value,frequency);
            barGroupers.put(key,barGrouper);
        }

    }



    @Override
    public void addValue(DateValues<IBar> object) {
        for(Map.Entry<String, IBar> entry:object.getDatas().entrySet())
        {
            String key = entry.getKey();
            IBar bar = entry.getValue();
            if(barGroupers.containsKey(key))
            {
                BarGrouper barGrouper = barGroupers.get(key);
                barGrouper.addValue(bar);
            }
            else {
                BarGrouper barGrouper =  new BarGrouper(getDateTime(),bar,frequency);
                barGroupers.put(key,barGrouper);
            }
        }
    }

    @Override
    public Bars getGrouped() {
        Map<String,IBar> map = new HashMap<>();


        for(Map.Entry<String,BarGrouper> entry:barGroupers.entrySet())
        {
            map.put(entry.getKey(),entry.getValue().getGrouped());
        }


        Bars bars = null;
        try {
            bars = new Bars(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bars;
    }
}
