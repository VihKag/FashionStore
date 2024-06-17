package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Query("SELECT p FROM Product p JOIN p.warehouse w JOIN p.category c WHERE (:warehouseId IS NULL OR w.id = :warehouseId) AND (:categoryId IS NULL OR c.id = :categoryId)")
    List<Product> findAllByWarehouseIdAndCategoryId(@Param("warehouseId") String warehouseId, @Param("categoryId") String categoryId);
    List<Product> findByType(String type);
    Page<Product> findAllByActiveIsTrue(Pageable pageable); ;
    @Query("SELECT p FROM Product p WHERE (:categoryId IS NULL OR p.category.id = :categoryId) AND (p.price BETWEEN :minPrice AND :maxPrice) AND (:searchValue IS NULL OR p.productName LIKE %:searchValue%) AND p.active = true")
    Page<Product> findByCategoryAndPriceRangeAndActive(
            @Param("categoryId") String categoryId,
            @Param("searchValue") String searchValue,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice,
            Pageable pageable
    );
    @Query("SELECT p FROM Product p WHERE (:categoryId IS NULL OR p.category.id = :categoryId) AND (:searchValue IS NULL OR p.productName LIKE %:searchValue%)")
    Page<Product> findByCategoryAndSearchValue(
            @Param("categoryId") String categoryId,
            @Param("searchValue") String searchValue,
            Pageable pageable
    );

    // Đếm số lượng sản phẩm hiện có
    @Query("SELECT COUNT(p) FROM Product p WHERE p.active = true")
    Long countActiveProducts();

    // Đếm số lượng sản phẩm theo danh mục
    @Query("SELECT p.category.name, COUNT(p) FROM Product p WHERE p.active = true GROUP BY p.category.name")
    List<Object[]> countProductsByCategory();

    // Đếm số lượng sản phẩm theo thương hiệu
    @Query("SELECT p.brand, COUNT(p) FROM Product p WHERE p.active = true GROUP BY p.brand")
    List<Object[]> countProductsByBrand();

    // Lấy danh sách sản phẩm bán chạy nhất (dựa trên số lượng đánh giá hoặc số lượng bán)
    @Query("SELECT p, COUNT(e) FROM Product p LEFT JOIN p.evaluates e GROUP BY p ORDER BY COUNT(e) DESC")
    List<Object[]> getTopSellingProducts();

    // Lấy danh sách sản phẩm có đánh giá cao nhất (dựa trên điểm đánh giá)
    @Query("SELECT p, AVG(e.starRating) FROM Product p LEFT JOIN p.evaluates e GROUP BY p ORDER BY AVG(e.starRating) DESC")
    List<Object[]> getTopRatedProducts();
}
