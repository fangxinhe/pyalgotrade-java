package com.jrj.quant.web.bean;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by h on 2016/11/27.
 */
public class WebChart {
    String startTime;
    String endTime;
    List<ChartPoint> datas = new ArrayList<>();

    public WebChart() {
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public List<ChartPoint> getDatas() {
        return datas;
    }
    public void addPoint(ChartPoint chartPoint)
    {
        datas.add(chartPoint);
    }


    public void setDatas(List<ChartPoint> datas) {
        this.datas = datas;
    }
}
