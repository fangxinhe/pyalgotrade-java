package com.h.quant.dataseries;

import java.util.Date;
import java.util.List;

/**
 * Created by h on 2016/11/19.
 */
public abstract class IDataSeries<T> {

    Integer maxLen;
    public IDataSeries(Integer maxLen)
    {
        if(maxLen == null)
            maxLen = 10240;
        this.maxLen = maxLen;
    }

    public abstract int size();

    public abstract T getValueAbsolute(int index);

    public abstract List<T> getDatas(int start, int end);

    public abstract List<T> getDatas(int start);

    public abstract List<Date> getTimes();

    public abstract void addData(Date dateTime, T data);

    public void addData(T data) {
        addData(null, data);
    }

}
