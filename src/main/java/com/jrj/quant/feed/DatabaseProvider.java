package com.jrj.quant.feed;

import com.jrj.quant.Dispatcher;
import com.jrj.quant.data.DateValues;
import com.jrj.quant.data.IBar;
import com.jrj.quant.dataseries.IDataSeries;
import com.jrj.quant.enums.BarSize;

import java.util.Date;
import java.util.List;

public class DatabaseProvider extends BaseFeed {

	public DatabaseProvider(int maxLen) {
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
	public void getDataAsyn(Date startDate, Date endDate, String instrument, BarSize barSize,
			IDataReciver dataReciver) {
		
	}

	@Override
	public DateValues getNextValues() {
		return null;
	}

	@Override
	public void start() {

	}

	@Override
	public void stop() {

	}

	@Override
	public void join() {

	}

	@Override
	public boolean eof() {
		return false;
	}

	@Override
	public Date peedDateTime() {
		return null;
	}

	@Override
	public void onDispatcherRegistered(Dispatcher dispatcher) {

	}
}
