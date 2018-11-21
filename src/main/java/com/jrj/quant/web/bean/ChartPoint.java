package com.jrj.quant.web.bean;

import java.util.Date;

/**
 * Created by h on 2016/11/27.
 */
public class ChartPoint {
    Date date;
    double value;

    public ChartPoint(Date date, double value) {
        this.date = date;
        this.value = value;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
