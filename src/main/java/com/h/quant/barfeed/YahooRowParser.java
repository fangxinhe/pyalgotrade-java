package com.h.quant.barfeed;

import com.h.quant.exceptions.QuantException;
import com.h.quant.Common;
import com.h.quant.data.BasicBar;
import com.h.quant.enums.BarFrequency;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class YahooRowParser {

    boolean sanitize = false;


    Date parsDate(String dateString) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.parse(dateString);
    }

    BasicBar parseBar(Map<String,String> dict) throws ParseException, QuantException {
        Date dateTime = parsDate((String) dict.get("Date"));
        double close = Double.parseDouble(dict.get("Close"));
        double open = Double.parseDouble(dict.get("Open"));
        double high = Double.parseDouble(dict.get("High"));
        double low = Double.parseDouble(dict.get("Low"));
        double volume = Double.parseDouble(dict.get("Volume"));
        double adjColse = Double.parseDouble(dict.get("Adj Close"));
        if(sanitize)
            Common.sanitize_ohlc(open,high,low,close);

        return new BasicBar(dateTime,open,high,low,close,volume,adjColse,BarFrequency.DAY);

    }


}
