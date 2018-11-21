package com.jrj.quant;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class Event {

    Set<IHandler> handlers = new CopyOnWriteArraySet<>();

    public void subscribe(IHandler handler) {
        handlers.add(handler);
    }

    public void unSubscribe(IHandler handler) {
        handlers.remove(handler);
    }

    public void emit(Object... args) {
        for (IHandler handler : handlers) handler.update(args);
    }


}
