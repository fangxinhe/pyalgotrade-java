package com.jrj.quant.resampled;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public abstract class TimeRange {
    protected Date begin;
    protected Date end;

    public boolean belongs(Date dateTime) {
        return (begin.before(dateTime) && end.after(dateTime));
    }

    public Date getBeginning() {
        return begin;
    }

    public Date getEnding() {
        return end;
    }
}
