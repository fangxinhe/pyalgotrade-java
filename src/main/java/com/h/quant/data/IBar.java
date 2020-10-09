package com.h.quant.data;

import com.h.quant.enums.BarFrequency;

import java.util.Date;
import java.util.Map;

/**
 * Created by hefangxin on 2016/11/22.
 */
public interface IBar {
    void setUseAdjustedValue(boolean useAdjusted);
    boolean getUseAdjValue();
    Date getDateTime();
    double getOpen(Boolean adjusted);

    double getHigh(Boolean adjusted);
    double getLow(Boolean adjusted);
    double getClose(Boolean adjusted);
    double getVolume();
    Double getAdjClose();
    BarFrequency getFrequency();
    double getTypicalPrice();
    double getPrice();
    Map<String,Object> getExtraColumns();
}
