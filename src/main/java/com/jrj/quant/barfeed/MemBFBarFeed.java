package com.jrj.quant.barfeed;

import com.jrj.quant.Dispatcher;
import com.jrj.quant.Utils.DateUtil;
import com.jrj.quant.data.Bars;
import com.jrj.quant.data.IBar;
import com.jrj.quant.exceptions.QuantException;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class MemBFBarFeed extends BaseBarFeed {
    Map<String, List<IBar>> bars = new HashMap<>();
    Map<String, Integer> nextPos = new HashMap<>();
    boolean started = false;
    Date currDateTime = null;

    public MemBFBarFeed() {
        super(1024);
    }

    @Override
    public Date getCurrentDateTime() {
        return currDateTime;
    }

    @Override
    public boolean barsHaveAdjClose() {
        return false;
    }

    @Override
    public Bars getNextBars() {

        Date smallestDateTime = peedDateTime();
        if(smallestDateTime == null)
            return null;
        Map<String, IBar> map = new HashMap<>();
        for (Map.Entry<String, List<IBar>> entry : bars.entrySet()) {
            String key = entry.getKey();
            List<IBar> value = entry.getValue();
            Integer pos = nextPos.get(key);
            if(pos == null)
                continue;
            map.put(key,value.get(pos));
            nextPos.put(key,pos+1);
        }
        try {
            Bars bars = new Bars(map);

            currDateTime = smallestDateTime;
            return bars;
        } catch (Exception e) {
            return null;
        }
    }

    public void reset() {
        nextPos.clear();
        for (String instrument : bars.keySet()) {
            nextPos.put(instrument, 0);
        }
        currDateTime = null;
        super.reset();
    }

    protected void addBarsFromSequence(String instrument, List<IBar> bars) {
        nextPos.put(instrument, 0);
        bars = bars.stream().sorted((b1, b2) -> b1.getDateTime().compareTo(b2.getDateTime())).collect(Collectors.toList());
        this.bars.put(instrument, bars);

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

        for (Map.Entry<String, List<IBar>> entry : bars.entrySet()) {
            String key = entry.getKey();
            Integer pos = nextPos.get(key);
            if(pos == null)
                return true;
            if (pos >= entry.getValue().size())
                return true;
        }

        return false;
    }

    @Override
    public Date peedDateTime() {
        Date ret = null;
        for (Map.Entry<String, List<IBar>> entry : bars.entrySet()) {
            String key = entry.getKey();
            List<IBar> value = entry.getValue();
            int pos = nextPos.get(key);
            if (pos < entry.getValue().size())
                ret = DateUtil.safeMin(ret, value.get(pos).getDateTime());
        }
        return ret;
    }

    @Override
    public void onDispatcherRegistered(Dispatcher dispatcher) {

    }
}
