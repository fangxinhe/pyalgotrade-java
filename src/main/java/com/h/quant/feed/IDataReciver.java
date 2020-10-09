package com.h.quant.feed;

import com.h.quant.data.IBar;

import java.util.List;

public interface IDataReciver {

	public void reciveData(List<IBar> bars);
}
