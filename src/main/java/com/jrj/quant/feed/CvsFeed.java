package com.jrj.quant.feed;

import java.util.Date;
import java.util.List;

import com.jrj.quant.data.IBar;
import com.jrj.quant.dataseries.IDataSeries;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.enums.BarSize;

public class CvsFeed extends MemFeed {

	public CvsFeed(int maxLen) {
		super(maxLen);
	}

	@Override
	public IDataSeries createDataSeries(String key, int maxLen) {

		return null;
	}

	@Override
	public List<IBar> getData(Date startDate, Date endDate, String instrument, BarSize barSize) {
		return null;
	}

	@Override
	public void getDataAsyn(Date startDate, Date endDate,String instrument, BarSize barSize, IDataReciver dataReciver) {
		
	}

	@Override
	public DateValues getNextValues() {
		return null;
	}

}
