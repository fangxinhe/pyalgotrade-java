package com.jrj.quant.resampled;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class MonthRange extends TimeRange{
    public MonthRange(Date dateTime) {

        Calendar ca = Calendar.getInstance();
        ca.setTime(dateTime);
        ca.set(Calendar.HOUR_OF_DAY, 0);
        ca.set(Calendar.MINUTE, 0);
        ca.set(Calendar.SECOND, 0);
        ca.set(Calendar.MILLISECOND, 0);
        ca.set(Calendar.DAY_OF_MONTH,1);
        begin = ca.getTime();
        ca.add(Calendar.YEAR,1);
        end = ca.getTime();
    }

}
