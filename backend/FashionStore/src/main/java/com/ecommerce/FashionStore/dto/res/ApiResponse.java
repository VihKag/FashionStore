package com.ecommerce.FashionStore.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@AllArgsConstructor
@Setter
@Getter
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    // Constructors, getters, and setters
}
