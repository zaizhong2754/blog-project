package com.zz.exception;

public class SystemException extends RuntimeException{

    private String msg;

    public String getMsg() {
        return msg;
    }

    public SystemException(String msg) {
        super(msg);
        this.msg = msg;
    }

}