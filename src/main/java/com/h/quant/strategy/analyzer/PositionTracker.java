package com.h.quant.strategy.analyzer;

import com.h.quant.broker.IInstrumentTraits;

/**
 * 单支证券的
 * 
 * @author hefangxin
 *
 */
public class PositionTracker {

	double pnl;
	double avgPrice;
	double position;
	double commissions;
	double totalCommited;
	IInstrumentTraits instrumentTraits;

	public PositionTracker(IInstrumentTraits instrumentTraits) {
		this.instrumentTraits = instrumentTraits;
		reset();
	}

	public void reset() {
		pnl = 0;
		avgPrice = 0;
		position = 0;
		commissions = 0;
		totalCommited = 0;
	}

	public double getPnl() {
		return pnl;
	}

	public double getAvgPrice() {
		return avgPrice;
	}

	public double getPosition() {
		return position;
	}

	public double getCommissions() {
		return commissions;
	}

	public double getTotalCommited() {
		return totalCommited;
	}

	public IInstrumentTraits getInstrumentTraits() {
		return instrumentTraits;
	}

	public double getPnL(Double price, Boolean includeCommissions) {
		double ret = pnl;
		if (includeCommissions == null)
			includeCommissions = true;

		if (price != null) {
			ret += (price - avgPrice) * position;
		}

		if (includeCommissions) {
			ret -= commissions;
		}
		return ret;
	}

	public double getReturn(Double price, Boolean includeCommissions) {
		if (includeCommissions == null)
			includeCommissions = true;
		double ret = 0;
		double pnl = getPnL(price, includeCommissions);
		if (this.totalCommited != 0.0d) {
			ret = pnl / totalCommited;
		}
		return ret;
	}

	void openNewPosition(double quantity, double price) {
		this.avgPrice = price;
		this.position = quantity;
		this.totalCommited = this.avgPrice * Math.abs(this.position);
	}

	void extendCurrentPosition(double quantity, double price) {
		double newPosition = this.instrumentTraits.roundQuantity(this.position + quantity);
		this.avgPrice = (this.avgPrice * Math.abs(this.position) + price * Math.abs(quantity)) / Math.abs(newPosition);
		this.position = newPosition;
		this.totalCommited = this.avgPrice * Math.abs(this.position);
	}

	void reduceCurrentPosition(double quantity, double price) {
		assert this.instrumentTraits.roundQuantity(Math.abs(this.position) - Math.abs(quantity)) >= 0.0d;
		double pnl = (price - this.avgPrice) * (-quantity);
		this.pnl += pnl;
		this.position = this.instrumentTraits.roundQuantity(this.position + quantity);
		if (this.position == 0.0d) {
			this.avgPrice = 0.0d;
		}
	}

	public void update(double quantity, double price, double commission) {
		assert quantity != 0;
		assert price > 0;
		assert commission >= 0;

		if (this.position == 0.0d) {
			this.openNewPosition(quantity, price);
		} else {
			int currPosDirection = (int) Math.copySign(1, this.position);
			int tradeDirection = (int) Math.copySign(1, quantity);
			if (currPosDirection == tradeDirection) {
				extendCurrentPosition(quantity, price);
			} else {
				if (Math.abs(quantity) <= Math.abs(this.position)) {
					this.reduceCurrentPosition(quantity, price);
				} else {
					double newPos = this.position + quantity;
					reduceCurrentPosition(-this.position, price);
					openNewPosition(newPos, price);
				}
			}
		}
		this.commissions += commission;
	}

	public void buy(double quantity, double price, Double commission) {
		assert quantity > 0;
		if (commission == null)
			commission = 0.0;
		update(quantity, price, commission);
	}

	public void sell(double quantity, double price, Double commission) {
		assert quantity > 0;
		if (commission == null)
			commission = 0.0;
		update(-quantity, price, commission);
	}

	
}
