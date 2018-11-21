package com.jrj.quant.resampled;

import com.jrj.quant.enums.BarFrequency;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class RangeFactory {
    public static TimeRange buildRange(Date dateTime, long frequencys)
    {
        if(frequencys< BarFrequency.DAY.getSecond())
        {
            return new IntraDayRange(dateTime,frequencys);
        }
        else if (frequencys == BarFrequency.DAY.getSecond())
        {
            return new DayRange(dateTime);
        }
        else if(frequencys < BarFrequency.MONTH.getSecond())
        {
            return new MonthRange(dateTime);
        }
        return null;
    }
}
