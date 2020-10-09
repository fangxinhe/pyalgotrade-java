package com.h.quant.exceptions;

public class CompileException extends QuantException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	String message = "";
	int line = 0;

	public CompileException(String message, int line) {
		super(message);
		this.line = line;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getLine() {
		return line;
	}

	public void setLine(int line) {
		this.line = line;
	}

}
