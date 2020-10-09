package com.h.quant.service.impl;

import javax.tools.JavaCompiler;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;
import java.io.*;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * Created by h on 2016/11/26.
 */
public class JavaServiceImpl {

    public String excute(String strJava) throws IOException {

        //保存文件
        InputStream inCode = new ByteArrayInputStream(strJava.getBytes("UTF-8"));
        //java编译器
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        OutputStream outputStream = new ByteArrayOutputStream();
        int flag = compiler.run(inCode,null,null,null);
        System.out.println(flag == 0 ? "编译成功" : "编译失败");

        try {
            URL[] urls = new URL[] { new URL("file:/" + "E:/workspace/images/") };
            URLClassLoader loader = new URLClassLoader(urls);
          //  ClassLoader
            // 通过反射调用此类
            Class clazz = loader.loadClass("TestJava");

//            Method m = clazz.getMethod("main", String[].class);
//            // m.invoke(null,new String[]{"aa","bb"});
//            // 由于可变参数是jdk5.0之后才有，上面代码会编译成m.invoke(null,"aa","bb");会发生参数不匹配的问题
//            // 因此必须加上Object 强转
//            m.invoke(null, (Object) new String[] {});

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
