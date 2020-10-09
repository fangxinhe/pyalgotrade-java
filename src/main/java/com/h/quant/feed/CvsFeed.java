package com.h.quant.feed;

import java.util.Date;
import java.util.List;

import com.h.quant.dataseries.IDataSeries;
import com.h.quant.enums.BarSize;
import com.h.quant.data.IBar;
import com.h.quant.data.DateValues;

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
