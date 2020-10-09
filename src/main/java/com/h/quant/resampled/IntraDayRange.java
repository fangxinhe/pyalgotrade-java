package com.h.quant.resampled;

import com.h.quant.enums.BarFrequency;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class IntraDayRange extends TimeRange {

    public IntraDayRange(Date dateTime, long frequencys) {
        assert frequencys > 1;
        assert frequencys < BarFrequency.DAY.getSecond();
        long frequency = frequencys*1000;
        long slot = (dateTime.getTime()) / frequency;
        long slots = slot * frequency;
        begin = new Date(slots);
        end = new Date(slots + frequency);
    }


}
