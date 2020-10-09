package com.h.quant.Utils;

import java.util.DoubleSummaryStatistics;
import java.util.List;

/**
 * Created by h on 2016/11/27.
 */
public class MathUtil {

    public static double std(List<Double> list) {
        double ret = 0;
        DoubleSummaryStatistics avgStats = list.stream().mapToDouble((x) -> x).summaryStatistics();
        DoubleSummaryStatistics stats = list.stream().mapToDouble((x) -> Math.sqrt((x - avgStats.getAverage()) * (x - avgStats.getAverage()))).summaryStatistics();
        return (stats.getSum() / (list.size() - 1));
    }

    public static double mean(List<Double> list)
    {
        if(list == null || list.isEmpty())
            return 0;
        return list.stream().mapToDouble(x->x).summaryStatistics().getAverage();
    }

}
