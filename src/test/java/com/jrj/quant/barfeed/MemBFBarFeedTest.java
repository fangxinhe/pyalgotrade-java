package com.jrj.quant.barfeed;

import org.assertj.core.api.IntegerAssert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

/**
 * Created by hefangxin on 2016/11/24.
 */
public class MemBFBarFeedTest {

    @Test
    public void getCurrentDateTime() throws Exception {

    }

    @Test
    public void barsHaveAdjClose() throws Exception {

    }

    @Test
    public void getNextBars() throws Exception {

    }

    @Test
    public void reset() throws Exception {

    }

    @Test
    public void addBarsFromSequence() throws Exception {
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(6);
        list.add(5);
        list.add(4);

        System.out.println(Arrays.toString(list.toArray()));
        list = list.stream().sorted((x,y)->x.compareTo(y)).collect(Collectors.toList());
        System.out.println(Arrays.toString(list.toArray()));
    }

    @Test
    public void start() throws Exception {

    }

    @Test
    public void stop() throws Exception {

    }

    @Test
    public void join() throws Exception {

    }

    @Test
    public void eof() throws Exception {

    }

    @Test
    public void peedDateTime() throws Exception {

    }

    @Test
    public void onDispatcherRegistered() throws Exception {

    }
}