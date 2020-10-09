package com.h.quant.dataseries;

import com.h.quant.Event;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by h on 2016/11/19.
 */
public class SequenceDataSeries<T> extends IDataSeries<T> {

    List<T> datas = new ArrayList<>();
    List<Date> dateTimes = new ArrayList();
    Event newValueEvent = new Event();

    public SequenceDataSeries(Integer maxLen) {
        super(maxLen);
    }

    public SequenceDataSeries(int maxLen, Event newValueEvent){
        super(maxLen);
        this.newValueEvent = newValueEvent;
        datas = new ArrayList<T>(maxLen);
        dateTimes = new ArrayList(maxLen);
    }

    public int size() {
        return datas.size();
    }

    @Override
    public T getValueAbsolute(int index) {
        if (index < 0) {
            index += size();
        }
        assert (index >= 0 && index < size());

        return datas.get(index);
    }

    @Override
    public List<T> getDatas(int start, int end) {
        assert (start >= 0 && end >= start && end < size());
        return datas.subList(start, end);
    }

    @Override
    public List<T> getDatas(int start) {
        return datas.subList(start, size());
    }

    public List<T> getDatas() {
        return datas;
    }

    @Override
    public List<Date> getTimes() {
        return dateTimes;
    }

    public Date getTime(int index)
    {
        return dateTimes.get(index);
    }
    @Override
    public void addData(Date dateTime, T data) {
        assert (datas.size() == dateTimes.size());
        dateTimes.add(dateTime);
        datas.add(data);
        newValueEvent.emit(this,dateTime,data);
    }


}
