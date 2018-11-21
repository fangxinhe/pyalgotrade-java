package com.jrj.quant;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuantJrjApplicationTests {

	@Test
	public void contextLoads() {
		Map<String, String> datas = new LinkedHashMap<>();
		datas.put("11","11");
		datas.put("33","22");
		datas.put("22","33");
		datas.put("d","44");
		datas.put("a","55");
		datas.put("c","66");
		datas.put("z","77");
		datas.put("f","88");
		for(String key :datas.values())
		{
			System.out.println(key);
		}
	}

}
