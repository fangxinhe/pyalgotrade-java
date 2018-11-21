package com.jrj.quant.resampled;

import com.jrj.quant.enums.BarFrequency;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class DayRange extends TimeRange {



    public DayRange(Date dateTime) {
        Calendar ca = Calendar.getInstance();
        ca.setTime(dateTime);
        ca.set(Calendar.HOUR_OF_DAY, 0);
        ca.set(Calendar.MINUTE, 0);
        ca.set(Calendar.SECOND, 0);
        ca.set(Calendar.MILLISECOND, 0);

        begin = ca.getTime();
        end = new Date(ca.getTimeInMillis()+ BarFrequency.DAY.getMSecond());

    }

}
