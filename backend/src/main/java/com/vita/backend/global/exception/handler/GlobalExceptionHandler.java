package com.vita.backend.global.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vita.backend.global.exception.category.BadRequestException;
import com.vita.backend.global.exception.category.ForbiddenException;
import com.vita.backend.global.exception.category.NotFoundException;
import com.vita.backend.global.exception.category.UnAuthorizedException;
import com.vita.backend.global.exception.category.ValidationException;
import com.vita.backend.global.exception.category.VitaRuntimeException;
import com.vita.backend.global.exception.response.ErrorResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResponse methodValidationHandler(MethodArgumentNotValidException exception) {
		String message = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
		log.error(message, exception);
		return new ErrorResponse(HttpStatus.BAD_REQUEST, message);
	} // 400

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BadRequestException.class)
	public ErrorResponse badRequestHandler(VitaRuntimeException exception) {
		log.error(exception.getMessageKey(), exception, exception.getParams());
		return new ErrorResponse(exception.getErrorCode());
	} // 400

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(UnAuthorizedException.class)
	public ErrorResponse unAuthorizedHandler(VitaRuntimeException exception) {
		log.error(exception.getMessageKey(), exception, exception.getParams());
		return new ErrorResponse(exception.getErrorCode());
	} // 401

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(ForbiddenException.class)
	public ErrorResponse forbiddenHandler(VitaRuntimeException exception) {
		log.error(exception.getMessageKey(), exception, exception.getParams());
		return new ErrorResponse(exception.getErrorCode());
	} // 403

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	public ErrorResponse notFoundHandler(VitaRuntimeException exception) {
		log.error(exception.getMessageKey(), exception, exception.getParams());
		return new ErrorResponse(exception.getErrorCode());
	} // 404

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ValidationException.class)
	public ErrorResponse validationHandler(VitaRuntimeException exception) {
		log.error(exception.getMessageKey(), exception, exception.getParams());
		return new ErrorResponse(exception.getErrorCode());
	} // 400
}
