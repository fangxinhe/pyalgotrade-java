package com.h.quant.enums;

/**
 * Created by h on 2016/11/19.
 */
public enum BarColor {
    black("000000"),
    red("ff0000"),
    green("00ff00"),
    blue("0000ff"),
    ;
    String value;
    BarColor(String value)
    {
        this.value = value;
    }
}
