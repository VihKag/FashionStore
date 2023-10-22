package com.shop.fashionmale.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileForm {
    private String firstName;

    private String lastName;

    private String phone;

    private Boolean gender;

    private LocalDate birthday;
}
