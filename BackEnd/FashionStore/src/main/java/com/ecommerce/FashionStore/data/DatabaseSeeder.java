//package com.ecommerce.FashionStore.data;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//import com.ecommerce.FashionStore.entity.*;
//import com.ecommerce.FashionStore.repository.*;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class DatabaseSeeder implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;
//    private final TokenRepository tokenRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final SizeRepository sizeRepository;
//    private final  ColorRepository colorRepository;
//    private final CategoryRepository CategoryRepository;
//    private final CategoryRepository categoryRepository;
//    private final WarehouseRepository warehouseRepository;
//    private final ProductRepository productRepository;
//    private final ProductDetailRepository productDetailRepository;
//
//    public DatabaseSeeder(UserRepository userRepository, RoleRepository roleRepository, TokenRepository tokenRepository,
//                          SizeRepository sizeRepository, ColorRepository colorRepository, PasswordEncoder passwordEncoder,
//                          CategoryRepository CategoryRepository, CategoryRepository categoryRepository, WarehouseRepository warehouseRepository,
//                          ProductRepository productRepository, ProductDetailRepository productDetailRepository) {
//        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
//        this.tokenRepository = tokenRepository;
//        this.sizeRepository = sizeRepository;
//        this.colorRepository = colorRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.CategoryRepository = CategoryRepository;
//        this.categoryRepository = categoryRepository;
//        this.warehouseRepository = warehouseRepository;
//        this.productRepository = productRepository;
//        this.productDetailRepository = productDetailRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Tạo roles
//        Role adminRole = new Role();
//        adminRole.setRole("ROLE_ADMIN");
//        roleRepository.save(adminRole);
//
//        // Tạo Size
//        List<Size> sizes = new ArrayList<>();
//        sizes.add(new Size("S"));
//        sizes.add(new Size("M"));
//        sizes.add(new Size("L"));
//        sizes.add(new Size("XL"));
//        sizes.add(new Size("2XL"));
//        sizes.add(new Size("3XL"));
//        sizeRepository.saveAll(sizes);
//
//        // Tạo Color
//        List<Color> colors = new ArrayList<>();
//        colors.add(new Color("#FF0000", "Đỏ (Red)"));
//        colors.add(new Color("#0000FF", "Xanh (Blue)"));
//        colors.add(new Color("##008000", "Lục (Green)"));
//        colors.add(new Color("#FFFF00", "Vàng (Yellow)"));
//        colors.add(new Color("#FFA500", "Cam (Orange)"));
//        colors.add(new Color("#800080", "Tím (Purple)"));
//        colors.add(new Color("#FFC0CB", "Hồng (Pink)"));
//        colors.add(new Color("#A52A2A", "Nâu (Brown)"));
//        colors.add(new Color("#808080", "Xám (Gray)"));
//        colors.add(new Color("#000000", "Đen (Black)"));
//        colorRepository.saveAll(colors);
//
//        Role userRole = new Role();
//        userRole.setRole("ROLE_USER");
//        roleRepository.save(userRole);
//
//        // Tạo users
//        User adminUser = new User();
//        adminUser.setId("admin");
//        adminUser.setEmail("admin@gmail.com");
//        adminUser.setName("Admin");
//        adminUser.setPassword(passwordEncoder.encode("password"));
//        adminUser.setActive(true);
//        adminUser.setRoles(Arrays.asList(adminRole));
//        userRepository.save(adminUser);
//
//        User normalUser = new User();
//        normalUser.setId("user");
//        normalUser.setEmail("user@gmail.com");
//        normalUser.setName("User");
//        normalUser.setPassword(passwordEncoder.encode("password"));
//        normalUser.setActive(true);
//        normalUser.setRoles(Arrays.asList(userRole));
//        userRepository.save(normalUser);
//
//        // Tạo Category
//        List<Category> categories = new ArrayList<>();
//        Category category1 = new Category("AOKHOAC","Áo Khoác");
//        Category category2 = new Category("AOTHUN","Áo thun");
//        Category category3 = new Category("AOSOMI","Áo sơ mi");
//        Category category4 = new Category("DOLOT","Đồ lót");
//        Category category5 = new Category("QUANDAI","Quần dài");
//        Category category6 = new Category("QUANNGAN","Quần ngắn");
//        Category category7 = new Category("PHUKIEN","Phụ kiện");
//        categories.add(category1);
//        categories.add(category2);
//        categories.add(category3);
//        categories.add(category4);
//        categories.add(category5);
//        categories.add(category6);
//        categories.add(category7);
//        categoryRepository.saveAll(categories);
//
//        // Tạo warehouse
//        Warehouse warehouse = new Warehouse();
//        warehouse.setId("WH001");
//        warehouse.setName("Kho hàng linh Trung");
//        warehouse.setLocation("Hồ Chí Minh");
//        warehouseRepository.save(warehouse);
//
// //Tạo Product
//List<Product> products = new ArrayList<>();
//    products.add(new Product("AK001", warehouse, "PAULWEEKEND Áo Khoác Hoodie Lót Nhung",category1 , "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", "PaulWeekend", true, "Do thiết bị hiển thị và ánh sáng khác nhau, hình ảnh có thể không phản ánh đầy đủ màu sắc thực của sản phẩm. Cảm ơn bạn đã hiểu biết của bạn.","trending",200));
//        products.add(new Product("ASM001", warehouse, "Áo sơ mi nam Soonvn", category3, "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", "Soonvn", true, "- Sản phẩm: Áo Sơ Mi Cộc Tay CT22 Chất Liệu Nhung Tăm, Thiết Kế Lịch Lãm, Trẻ Trung Năng Động" +
//                "- Thương hiệu SOON\n" +
//                "- Chất liệu: Nhung tăm","trending",200));
//        products.add(new Product("QD001", warehouse, "Quần Kaki Nam TARMOR", category5, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", "TARMOR", true, "Form quần rộng trendy với chất kaki thoải mái hơn, cho bạn một ngày năng động dù là đi làm hay đi học.","trending",200));
//        products.add(new Product("QN001", warehouse, "quần short jean đùi nam", category6, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", "KAYSTORE", true, "Quần jean nam với thiết kế mới thời trang hơn, mang lại sự tự tin tối đa cho người mặc trước những người xung quanh\n" +
//                "Quần may bằng vải denim nên rất mềm và thoải mái khi mặc, đảm bảo sẽ không hề cảm thấy gò bó ngay cả khi di chuyển nhiều.","trending",200));
//        products.add(new Product("DL001", warehouse, "Hộp 4 Quần Sịp Thông Hơi Nam Cao Cấp NANJIREN", category4, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lswx3ywi38p081", "NANJIREN", true, "Thiết kế ôm sát cơ thể, thời trang, trẻ trung, đặc biệt thích hợp khi vận động, chơi thể thao." +
//                "Chất liệu thun lạnh, trơn, mịn, mềm mai, bền đẹp, thoáng mát, đàn hồi và hút ẩm tốt. Đây là loại chất liệu có độ thoáng khí cao và tạo cảm giác người mặc như không mặc.","Feature Design",200));
//        products.add(new Product("PK001", warehouse, "Thắt Lưng Nam Da Bò Thật Nguyên Miếng", category7, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llrk3bowtlgfcb", "", true, "1 THẮT LƯNG DA + 1 HỘP ĐỰNG SẢN PHẨM + 01 QUÀ TẶNG KÈM SẢN PHẨM","Feature Design",200));
//        products.add(new Product("AT001", warehouse, "Product 7", category2, "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", "Brand 7", true, "Description 7","New Arrival",200));
//        products.add(new Product("AK002", warehouse, "Áo khoác nam KYUSHUAD Phong cách Hàn Quốc", category1, "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", "KYUSHUAD", true, "Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ trả lời câu hỏi của bạn càng sớm càng tốt và cố gắng hết sức để giải quyết vấn đề của bạn.","Feature Design",200));
//        products.add(new Product("ASM002", warehouse, "NCERUN Áo Sơ Mi Ngắn Tay", category3, "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", "INCERUN", true, "Chất liệu vải: 100% polyeste\n" +
//                "Màu: Đen, Xanh" +
//                "Phong cách: Kiến thức cơ bản","Feature Design",200));
//        products.add(new Product("AT002", warehouse, "Áo Thun Phông Nam ", category2, "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", "SOMETHING", true, "Áo Thun Phông Nam Nữ Local Brand Form Rộng Something AT Urban","New Arrival",200));
//        products.add(new Product("QN002", warehouse, "quần short jean đùi", category6, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", "KAYSTORE", true, "Quần jean nam với thiết kế mới thời trang hơn, mang lại sự tự tin tối đa cho người mặc trước những người xung quanh\n" +
//                "Quần may bằng vải denim nên rất mềm và thoải mái khi mặc, đảm bảo sẽ không hề cảm thấy gò bó ngay cả khi di chuyển nhiều.","New Arrival",200));
//        products.add(new Product("QD002", warehouse, "Quần Kaki Nam", category5, "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", "TARMOR", true, "Form quần rộng trendy với chất kaki thoải mái hơn, cho bạn một ngày năng động dù là đi làm hay đi học.","New Arrival",200));
//        productRepository.saveAll(products);
//
//// Tạo Productdetail
//List<Productdetail> productdetails = new ArrayList<>();
//    productdetails.add(new Productdetail("AK001_01", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AK001_02", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AK001_03", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("AK001_04", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AK001_05", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AK001_06", productRepository.findById("AK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rbnf-llvouwi1tzkba6", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("ASM001_01", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("ASM001_02", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("ASM001_03", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("ASM001_04", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("ASM001_05", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("ASM001_06", productRepository.findById("ASM001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lk0hgkvi3mdedc", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("ASM002_01", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("ASM002_02", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("ASM002_03", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("ASM002_04", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("ASM002_05", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("ASM002_06", productRepository.findById("ASM002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7qvf1-ljxmpxoz1u477e", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("QD001_01", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QD001_02", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QD001_03", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("QD001_04", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QD001_05", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QD001_06", productRepository.findById("QD001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("QN001_01", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QN001_02", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QN001_03", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("QN001_04", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QN001_05", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QN001_06", productRepository.findById("QN001").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("QD002_01", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QD002_02", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QD002_03", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("QD002_04", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QD002_05", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QD002_06", productRepository.findById("QD002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lp7jvg05l7x759", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("QN002_01", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QN002_02", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QN002_03", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("QN002_04", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("QN002_05", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("QN002_06", productRepository.findById("QN002").orElse(null), "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luir0kx6dtt195", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//
//        productdetails.add(new Productdetail("PK001_01", productRepository.findById("PK001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 20, colorRepository.findById(10).orElse(null), null));
//
//        productdetails.add(new Productdetail("AT001_01", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AT001_02", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AT001_03", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("AT001_04", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AT001_05", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AT001_06", productRepository.findById("AT001").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("AK002_01", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AK002_02", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AK002_03", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("AK002_04", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AK002_05", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AK002_06", productRepository.findById("AK002").orElse(null), "https://down-vn.img.susercontent.com/file/sg-11134201-7rd4u-lve3lmw10cgs0d", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//
//        productdetails.add(new Productdetail("AT002_01", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 20, colorRepository.findById(10).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AT002_02", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 30, colorRepository.findById(10).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AT002_03", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 40, colorRepository.findById(10).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productdetails.add(new Productdetail("AT002_04", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 20, colorRepository.findById(9).orElse(null), sizeRepository.findById(3).orElse(null)));
//        productdetails.add(new Productdetail("AT002_05", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 30, colorRepository.findById(9).orElse(null), sizeRepository.findById(4).orElse(null)));
//        productdetails.add(new Productdetail("AT002_06", productRepository.findById("AT002").orElse(null), "https://down-vn.img.susercontent.com/file/1576b4f97487fc26e2d6779268d99d58", 40, colorRepository.findById(9).orElse(null), sizeRepository.findById(5).orElse(null)));
//        productDetailRepository.saveAll(productdetails);
//
//    }
//}
