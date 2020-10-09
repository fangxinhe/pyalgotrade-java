package com.h.quant.data;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by h on 2016/11/19.
 */
public class DateValues<T> {
    Date dateTime;
    Map<String, T> datas = new LinkedHashMap<>();

    public DateValues(Date dateTime, Map<String, T> datas) {
        this.dateTime = dateTime;
        this.datas = datas;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Map<String, T> getDatas() {
        return datas;
    }


}
