package com.h.quant;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class Common {
    public static double[] sanitize_ohlc(double open, double high, double low, double close) {


        if (low > open)
            low = open;
        if (low > close)
            low = close;
        if (high < open)
            high = open;
        if (high < close)
            high = close;
        double[] ret = new double[4];
        ret[0] = open;
        ret[1] = high;
        ret[2] = low;
        ret[3] = close;

        return ret;
    }
}
