package com.jrj.quant.run.backtest;

import java.util.Date;

public class DrawdownHelper {
	Double highWatermark = null;
	Double lowWatermark = null;
	Double lastLow = null;
	Date highDateTime;
	Date lastDateTime;
	
	public DrawdownHelper()
	{
		
	}
	
	
	public DrawdownHelper(Double highWatermark, Double lowWatermark, Double lastLow, Date highDateTime,
			Date lastDateTime) {
		super();
		this.highWatermark = highWatermark;
		this.lowWatermark = lowWatermark;
		this.lastLow = lastLow;
		this.highDateTime = highDateTime;
		this.lastDateTime = lastDateTime;
	}



	public long getDuration()
	{
		return lastDateTime.getTime() - highDateTime.getTime();
	}
	
	public double getMaxDrawDown()
	{
		return (lowWatermark - highWatermark)/highWatermark;
	}
	
	public double getCurrentDrawDown()
	{
		return (lastLow - highWatermark)/highWatermark;
	}
	
	public void update(Date dateTime ,double low,double high)
	{
		assert low <= high;
		lastLow = low;
		lastDateTime = dateTime;
		if(highWatermark == null || high >= highWatermark)
		{
			highWatermark = high;
			lowWatermark = low;
			highDateTime = dateTime;
		}
		else
		{
			lowWatermark = Math.min(lowWatermark, low);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
