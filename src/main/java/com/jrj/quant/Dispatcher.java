package com.jrj.quant;

import com.jrj.quant.Utils.DateUtil;
import org.python.antlr.op.Sub;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class Dispatcher {
    public static final int dispatchPrioBroker = 1000;
    public static final int getDispatchPrioBarFeed = 2000;
    public static final int getDispatchPrioLast = 0;

    List<Subject> subjects = new LinkedList<>();
    boolean stop = false;
    Event startEvent = new Event();
    Event idleEvent = new Event();
    Date currDateTime = null;

    Date getCurrentDateTime() {
        return currDateTime;
    }

    public Event getStartEvent() {
        return startEvent;
    }

    public Event getIdleEvent() {
        return idleEvent;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void stop() {
        stop = true;
    }

    public void addSubject(Subject subject) {
        if (subjects.contains(subject))
            return;
        if (subject.getDispatchPriority() == Dispatcher.getDispatchPrioLast) {
            subjects.add(subject);
        } else {
            int pos = 0;
            for (pos = 0; pos < subjects.size(); pos++) {
                Subject s = subjects.get(pos);
                if (s.getDispatchPriority() == getDispatchPrioLast || subject.getDispatchPriority() < s.getDispatchPriority())
                    break;
            }
            subjects.add(pos, subject);
        }
    }

    public boolean __dispatchSubject(Subject subject, Date currDateTime) {
        if (!subject.eof() && (subject.peedDateTime() == null || subject.peedDateTime().equals(currDateTime)))
            return subject.dispatch();
        return false;
    }

    public class DisRet {
        public boolean eof = true;
        public boolean eventsDispatched = false;
    }

    public DisRet __dispatch() {
        DisRet ret = new DisRet();
        Date smallestDateTime = null;
        for (Subject sub : subjects) {
            if (!sub.eof()) {
                ret.eof = false;
                smallestDateTime = DateUtil.safeMin(smallestDateTime, sub.peedDateTime());
            }
        }
        if (ret.eof)
            return ret;
        for (Subject subject : subjects) {
            if (__dispatchSubject(subject, smallestDateTime)) {
                ret.eventsDispatched = true;
            }
        }
        return ret;
    }

    public void run()
    {

        try{
            subjects.forEach(Subject::start);

            startEvent.emit();

            while (!stop)
            {
                DisRet ret = __dispatch();
                if(ret.eof)
                    stop = true;
                else if(!ret.eventsDispatched)
                    idleEvent.emit();
            }

        }finally {
            subjects.forEach(Subject::stop);
            subjects.forEach(Subject::join);
        }



    }


}
