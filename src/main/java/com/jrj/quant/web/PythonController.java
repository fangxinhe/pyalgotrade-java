package com.jrj.quant.web;

import java.util.*;

import com.jrj.quant.barfeed.YahooFeed;
import com.jrj.quant.data.BasicBar;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;
import com.jrj.quant.service.impl.PythonServiceImpl;
import com.jrj.quant.strategy.BacktestingStrategy;
import com.jrj.quant.strategy.BaseStrategy;
import com.jrj.quant.strategy.analyzer.Returns;
import com.jrj.quant.web.bean.ChartPoint;
import com.jrj.quant.web.bean.WebChart;
import com.jrj.quant.web.bean.WebReturn;
import org.python.core.PyInteger;
import org.python.core.PyList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jrj.quant.exceptions.CompileException;

@RestController

@RequestMapping("/python")
public class PythonController {
    @Autowired
    PythonServiceImpl pythonService;

    @RequestMapping("/run")
    public Object run(String command) {
        try {
            BacktestingStrategy strategy = (BacktestingStrategy) pythonService.strToStrategy(command);
            YahooFeed feed = new YahooFeed();
            feed.`  ("orcl","orcl-2000.csv",null);
            strategy.init(null,feed,1000000,null);
            Returns returns = new Returns();
            strategy.attachAnalyzer(returns);
            strategy.run();
            WebChart webChart = new WebChart();

            for(int i=0;i<returns.getEquips().size();i++)
            {
                webChart.addPoint(new ChartPoint(returns.getEquips().getTime(i),returns.getEquips().getValueAbsolute(i)));
            }

            return WebReturn.build(webChart,pythonService.getOutput());
        } catch (Exception e) {
            return WebReturn.build(null,e.getMessage());
        }
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public String test(String appid) {
        return "post";
    }


}
