package com.h.quant.service.impl;

import java.io.ByteArrayOutputStream;
import java.util.Properties;

import com.h.quant.exceptions.CompileException;
import com.h.quant.strategy.BacktestingStrategy;
import com.h.quant.strategy.BaseStrategy;
import org.python.core.PyException;
import org.python.core.PyObject;
import org.python.core.PySystemState;
import org.python.util.PythonInterpreter;
import org.python.util.jython;
import org.springframework.stereotype.Service;


@Service
public class PythonServiceImpl {


    private static ThreadLocal<PythonInterpreter> interpreter = new ThreadLocal<PythonInterpreter>();
    private static ThreadLocal<ByteArrayOutputStream> out = new ThreadLocal<ByteArrayOutputStream>();


    public PythonServiceImpl() {

        Properties props = new Properties();
        //props.put("python.home", "C:\\tools\\jython2.7.0\\Lib");
        props.put("python.console.encoding", "UTF-8");
        props.put("python.security.respectJavaAccessibility", "false");
        props.put("python.import.site", "false");
        Properties preprops = System.getProperties();
        PythonInterpreter.initialize(preprops, props, new String[0]);
    }

    public PythonInterpreter initInterpreter() {
        PythonInterpreter interpreter = PythonServiceImpl.interpreter.get();
        if (interpreter == null) {
            jython.shutdownInterpreter();
            //interpreter = PythonInterpreter.threadLocalStateInterpreter(null);
            interpreter = new PythonInterpreter(null,new PySystemState());
            PythonServiceImpl.interpreter.set(interpreter);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PythonServiceImpl.out.set(out);
            interpreter.setOut(out);
        }
        interpreter.cleanup();
        interpreter.exec("import sys");
        interpreter.exec("from com.jrj.quant.strategy import BacktestingStrategy");
        return interpreter;
    }

    public BaseStrategy strToStrategy(String input) throws CompileException {
        try {
                System.out.println("BaseStrategy : "+Thread.currentThread().getName()+" interperter:"+interpreter.get()+"  out: "+out.get());
            PythonInterpreter interpreter = initInterpreter();

            clean();
            interpreter.exec(input);
            PyObject jyStrategyClass = interpreter.get("Strategy");
            if (jyStrategyClass == null)
                throw new CompileException("没有类 Strategy", 0);
            PyObject pyObj = jyStrategyClass.__call__();
            BaseStrategy strategy = (BacktestingStrategy) pyObj.__tojava__(BacktestingStrategy.class);
            //strategy.setBarFeed();
            //strategy.setBroker(new BtBroker());
            return strategy;
        } catch (PyException e) {
            e.printStackTrace();
            throw new CompileException("不能强转成 IStrategy ", 0);
        } catch (CompileException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getOutput() {
        String ret = out.get().toString();
        return ret;
    }

    public void clean() {
        if (interpreter.get() != null)
            interpreter.get().cleanup();
        if (out.get() != null)
            out.get().reset();
    }

}
