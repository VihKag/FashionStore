package com.shop.fashionmale.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileRequest {

    private String firstname;

    private String lastname;

    private String phone;

    private Boolean gender;

    private LocalDate birthday;
}
