package com.h.quant;

import java.util.Date;

/**
 * Created by hefangxin on 2016/11/23.
 */
public abstract class Subject {

    int dispatchPriority = Dispatcher.getDispatchPrioLast;
    public abstract void start();

    public abstract void stop();

    public abstract void join();

    public abstract boolean eof();

    public abstract boolean dispatch();

    public abstract Date peedDateTime();

    public int getDispatchPriority() {
        return dispatchPriority;
    }

    public void setDispatchPriority(int dispatchPriority) {
        this.dispatchPriority = dispatchPriority;
    }

    public abstract void onDispatcherRegistered(Dispatcher dispatcher);

}
