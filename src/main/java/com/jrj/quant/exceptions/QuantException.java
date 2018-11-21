package com.jrj.quant.exceptions;

public class QuantException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String msg;

	public QuantException(String msg,Object... args) {
		super();
		this.msg = String.format(msg,args);
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
