package com.jrj.quant.data;

import java.util.Date;
import java.util.Map;

import com.jrj.quant.enums.BarFrequency;
import com.jrj.quant.exceptions.QuantException;

public class BasicBar implements IBar {

	long id;
	Date time;
	double open;
	double high;
	double low;
	double close;
	double volume;
	Double adjClose;

	BarFrequency frequency;
	boolean useAdjustedValue = false;

	@SuppressWarnings("deprecation")
	public BasicBar(Date time , double open, double high, double low, double close, double volume,
					Double adjClose, BarFrequency frequency) throws QuantException {
		super();

		if (high < low)
			throw new QuantException("high < low : " + time.toLocaleString());
		else if (high < open)
			throw new QuantException("high < open: " + time.toLocaleString());
		else if (high < close)
			throw new QuantException("high < low : " + time.toLocaleString());
		else if (low > open)
			throw new QuantException("low > open : " + time.toLocaleString());
		else if (low > close)
			throw new QuantException("low > close : " + time.toLocaleString());

		this.time = time;
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
		this.volume = volume;
		this.adjClose = adjClose;
		this.frequency = frequency;
	}

	public BasicBar() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public double getPrice() {
		if(useAdjustedValue)
			return adjClose;
		return close;
	}

	@Override
	public Map<String, Object> getExtraColumns() {
		return null;
	}

	public double getOpen(Boolean adjusted) {
		if(adjusted!=null && adjusted)
		{
			return adjClose*open/close;
		}
		return open;
	}

	public void setOpen(double open) {
		this.open = open;
	}

	public double getHigh(Boolean adjusted) {
		if(adjusted!=null && adjusted)
		{
			return adjClose*high/close;
		}
		return high;
	}

	public void setHigh(double high) {
		this.high = high;
	}

	public double getLow(Boolean adjusted) {
		if(adjusted!=null && adjusted)
		{
			return adjClose*low/close;
		}
		return low;
	}

	public void setLow(double low) {

		this.low = low;
	}

	public double getClose(Boolean adjusted) {
		if(adjusted!=null && adjusted)
		{
			return adjClose;
		}
		return close;
	}

	public void setClose(double close) {
		this.close = close;
	}

	public double getVolume() {
		return volume;
	}

	public void setVolume(double volume) {
		this.volume = volume;
	}

	public Double getAdjClose() {
		return adjClose;
	}

	public void setAdjClose(Double adjClose) {
		this.adjClose = adjClose;
	}

	public BarFrequency getFrequency() {
		return frequency;
	}

	@Override
	public double getTypicalPrice() {
		return 0;
	}

	public void setFrequency(BarFrequency frequency) {
		this.frequency = frequency;
	}

	public boolean isUseAdjustedValue() {
		return useAdjustedValue;
	}

	public void setUseAdjustedValue(boolean useAdjustedValue) {
		this.useAdjustedValue = useAdjustedValue;
	}

	@Override
	public boolean getUseAdjValue() {
		return false;
	}

	@Override
	public Date getDateTime() {
		return time;
	}

}
