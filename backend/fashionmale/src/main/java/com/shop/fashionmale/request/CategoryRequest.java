package com.shop.fashionmale.request;

import com.shop.fashionmale.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryRequest {
    private String categoryId;
    private String categoryName;
    public void updateFromCategory(Category category){
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
    }
}
