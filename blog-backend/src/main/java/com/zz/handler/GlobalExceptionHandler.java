package com.zz.handler;

import com.zz.exception.SystemException;
import com.zz.pojo.Result;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// 全局异常处理器
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(SystemException.class)
    public Result systemExceptionHandler(SystemException e){
        //打印异常信息
        log.error("出现了异常！ {}",e);
        //从异常对象中获取提示信息封装返回
        return Result.error(e.getMsg());
    }

    /**
     * form-data表单类型的请求参数校验的异常处理
     * @param e BindException
     * @return
     */
    @ExceptionHandler(value = BindException.class)
    public Result errorHandler(BindException e) {
        //打印异常信息
        log.error("出现了异常！ {}",e);
        //从异常对象中获取提示信息封装返回
        BindingResult bindingResult = e.getBindingResult();
        String msg = extractException(bindingResult.getAllErrors());
        return Result.error(msg);
    }

    /**
     * @RequestBody类型的请求参数校验的异常处理
     * @param e MethodArgumentNotValidException
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result exceptionHandler(MethodArgumentNotValidException e){
        //打印异常信息
        log.error("出现了异常！ {}",e);
        //从异常对象中获取提示信息封装返回
        BindingResult bindingResult = e.getBindingResult();
        String msg = extractException(bindingResult.getAllErrors());
        return Result.error(msg);
    }

    /**
     * PathVariable和RequestParam的请求参数校验的异常处理
     * @param e ConstraintViolationException
     * @return
     */
    @ExceptionHandler(value = ConstraintViolationException.class)
    public Result errorHandler(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        String msg = constraintViolations.stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(";"));
        return Result.error(msg);
    }

    @ExceptionHandler(Exception.class)
    public Result exceptionHandler(Exception e, HttpServletResponse response){
        //打印异常信息
        log.error("出现了异常！ {}",e);
        if (e instanceof AccessDeniedException) {
            log.error("无权限操作");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN); // http状态码403
            return Result.error("无权限操作");
        }
        //从异常对象中获取提示信息封装返回
        return Result.error(e.getMessage());
    }

    private  String extractException(List<ObjectError> errorList) {
        StringBuilder errorMsg = new StringBuilder();
        for (ObjectError objectError : errorList) {
            errorMsg.append(objectError.getDefaultMessage()).append(";");
        }
        // 移除最后的分隔符
        errorMsg.delete(errorMsg.length() - 1, errorMsg.length());

        return errorMsg.toString();
    }
}
