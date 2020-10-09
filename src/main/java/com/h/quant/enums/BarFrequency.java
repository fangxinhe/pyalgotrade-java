package com.h.quant.enums;

/**
 * Created by h on 2016/11/20.
 */
public enum BarFrequency {
    TRADE(-1),
    SECOND(1),
    MINUTE(60),
    HOUR(60 * 60),
    DAY(24 * 60 * 60),
    WEEK(24 * 60 * 60 * 7),
    MONTH(24 * 60 * 60 * 31);
    int value;
    BarFrequency(int value) {
        this.value = value;
    }

    public long getMSecond() {
        return value*1000;
    }
    public long getSecond() {
        return value;
    }


}
