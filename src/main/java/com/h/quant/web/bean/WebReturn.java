package com.h.quant.web.bean;

/**
 * Created by hefangxin on 2016/11/28.
 */
public class WebReturn {
    String log;
    Object data;

    public WebReturn( Object data,String log) {
        this.log = log;
        this.data = data;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static WebReturn build(Object data,String log)
    {
        return new WebReturn(data,log);
    }

}
