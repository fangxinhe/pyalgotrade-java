package com.jrj.quant.feed;

import com.jrj.quant.data.IBar;

import java.util.List;

public interface IDataReciver {

	public void reciveData(List<IBar> bars);
}
