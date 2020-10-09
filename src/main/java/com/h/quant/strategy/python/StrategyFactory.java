//package com.jrj.quant.strategy.python;
//
//import java.io.ByteArrayOutputStream;
//import java.util.Properties;
//
//import javax.annotation.PostConstruct;
//
//import com.jrj.quant.broker.backtesting.BtBroker;
//import com.jrj.quant.strategy.BacktestingStrategy;
//import org.python.core.PyException;
//import org.python.core.PyObject;
//import org.python.util.PythonInterpreter;
//import org.springframework.stereotype.Service;
//
//import com.jrj.quant.exceptions.CompileException;
//import com.jrj.quant.strategy.BaseStrategy;
//import com.jrj.quant.strategy.IStrategyFactory;
//
//@Service
//public class StrategyFactory implements IStrategyFactory {
//
//	private static ThreadLocal<PythonInterpreter> interpreter = new ThreadLocal<PythonInterpreter>();
//	private static ThreadLocal<ByteArrayOutputStream> out = new ThreadLocal<ByteArrayOutputStream>();
//	private static ThreadLocal<String> output = new ThreadLocal<String>();
//
//	@PostConstruct
//	public void initPythonInterpreter() {
//		Properties props = new Properties();
//		//props.put("python.home", "C:\\tools\\jython2.7.0\\Lib");
//		props.put("python.console.encoding", "UTF-8");
//		props.put("python.security.respectJavaAccessibility", "false");
//		props.put("python.import.site", "false");
//		Properties preprops = System.getProperties();
//		PythonInterpreter.initialize(preprops, props, new String[0]);
//
//	}
//
//	public PythonInterpreter initInterpreter() {
//		PythonInterpreter interpreter = StrategyFactory.interpreter.get();
//		if (interpreter == null) {
//			interpreter = PythonInterpreter.threadLocalStateInterpreter(null);
//			StrategyFactory.interpreter.set(interpreter);
//			ByteArrayOutputStream out = new ByteArrayOutputStream();
//			StrategyFactory.out.set(out);
//			interpreter.setOut(out);
//		}
//		interpreter.cleanup();
//		interpreter.exec("import sys");
//		interpreter.exec("from com.jrj.quant.strategy import BacktestingStrategy");
//		return interpreter;
//	}
//
//	@Override
//	public BaseStrategy createStrategy(String input) throws CompileException {
//		try {
//			PythonInterpreter interpreter = initInterpreter();
//			interpreter.exec(input);
//			PyObject jyStrategyClass = interpreter.get("Strategy");
//			if (jyStrategyClass == null)
//				throw new CompileException("没有类 Strategy", 0);
//			PyObject pyObj = jyStrategyClass.__call__();
//			BaseStrategy strategy = (BacktestingStrategy) pyObj.__tojava__(BacktestingStrategy.class);
//			//strategy.setBarFeed();
//			//strategy.setBroker(new BtBroker());
//			return strategy;
//		} catch (PyException e) {
//			e.printStackTrace();
//			throw new CompileException("不能强转成 IStrategy ", 0);
//		}
//
//	}
//
//	@Override
//	public String getOutput() {
//		String ret = out.get().toString();
//		interpreter.get().cleanup();
//		out.get().reset();
//		return ret;
//	}
//
//	@Override
//	public void clearOutput() {
//		interpreter.get().cleanup();
//	}
//
//}
