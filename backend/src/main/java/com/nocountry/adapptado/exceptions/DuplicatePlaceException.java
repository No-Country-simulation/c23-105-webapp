package com.nocountry.adapptado.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicatePlaceException extends RuntimeException {
    public DuplicatePlaceException(String message) {
        super(message);
    }
}