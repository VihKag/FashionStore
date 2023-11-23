package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IColorRepository extends JpaRepository<Color,Integer> {
    Color findColorByColorName (String colorName);
}
