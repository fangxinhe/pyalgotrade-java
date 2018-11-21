package com.jrj.quant.Utils;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class DateUtil {

    public static Date safeMin(Date left, Date right)
    {
        if(left == null)
            return right;
        if(right == null)
            return left;
        if(left.after(right))
            return left;
        return right;
    }





}
