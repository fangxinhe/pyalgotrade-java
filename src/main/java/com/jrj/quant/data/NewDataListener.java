package com.jrj.quant.data;

import java.util.Date;

/**
 * Created by h on 2016/11/19.
 */
public interface NewDataListener<T> {
    void onNewData(Date dateTime, T data);
}
