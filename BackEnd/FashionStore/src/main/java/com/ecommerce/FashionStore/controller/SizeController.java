package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.SizeDto;
import com.ecommerce.FashionStore.entity.Size;
import com.ecommerce.FashionStore.repository.SizeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/size")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SizeController {
    private final SizeRepository SizeRepository;
    public SizeController(SizeRepository SizeRepository) {
        this.SizeRepository = SizeRepository;

    }
    @GetMapping("/list")
    public ResponseEntity<?> getAllSize() {
        List<Size> sizeList = SizeRepository.findAll();
        if (sizeList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<SizeDto> sizeDtoList = sizeList.stream()
                .map(size -> new SizeDto(
                        size.getId(),
                        size.getSizeName()
                )).collect(Collectors.toList());
        return ResponseEntity.ok(sizeDtoList);
    }

}
