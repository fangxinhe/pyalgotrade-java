package com.jrj.quant.data;

import com.jrj.quant.exceptions.QuantException;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 不同证券同一时间的bar
 * Created by hefangxin on 2016/11/22.
 */
public class Bars {
    Map<String, IBar> bars = new HashMap<>();
    Date datetime = null;
    String instrument = null;

    public Bars(Map<String, IBar> bars)  {
        if(bars == null)
            return;
        for (Map.Entry<String, IBar> entry : bars.entrySet()) {
            String instrument = entry.getKey();
            IBar bar = entry.getValue();
            if (instrument != null) {
                this.instrument = instrument;
                this.datetime = bar.getDateTime();
            } else {
                if (!this.datetime.equals(bar.getDateTime())) {
                        assert false;

                }
            }
        }
        this.bars = bars;

    }

    public Map<String, IBar> getBars() {
        return bars;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public Set<String> getInstruments() {
        return bars.keySet();
    }

    public IBar getBar(String instrument) {
        return bars.get(instrument);
    }

    public void setBar(String instrument,IBar bar)
    {
        bars.put(instrument,bar);
    }



}
