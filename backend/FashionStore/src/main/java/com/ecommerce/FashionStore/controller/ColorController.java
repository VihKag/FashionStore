package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.ColorDto;
import com.ecommerce.FashionStore.entity.Color;
import com.ecommerce.FashionStore.repository.ColorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/color")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ColorController {
    private final ColorRepository colorRepository;
    public ColorController(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }
    @GetMapping("/list")
    public ResponseEntity<?> getAllColors() {
        List<Color> colors = colorRepository.findAll();
        if (colors.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<ColorDto> colorDtos = colors.stream()
                .map(color -> new ColorDto(
                        color.getId(),
                        color.getColorCode(),
                        color.getColorName()
                )).collect(Collectors.toList());
        return ResponseEntity.ok(colorDtos);
    }
}
