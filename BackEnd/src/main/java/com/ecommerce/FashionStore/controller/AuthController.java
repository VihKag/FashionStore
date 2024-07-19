package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.req.SignInRequest;
import com.ecommerce.FashionStore.dto.req.SignUpRequest;
import com.ecommerce.FashionStore.dto.res.ApiResponse;
import com.ecommerce.FashionStore.dto.res.SignInResponse;
import com.ecommerce.FashionStore.dto.res.SignUpResponse;
import com.ecommerce.FashionStore.entity.Role;
import com.ecommerce.FashionStore.entity.Token;
import com.ecommerce.FashionStore.entity.User;
import com.ecommerce.FashionStore.repository.RoleRepository;
import com.ecommerce.FashionStore.repository.TokenRepository;
import com.ecommerce.FashionStore.repository.UserRepository;
import com.ecommerce.FashionStore.security.JwtTokenProvider;
import com.ecommerce.FashionStore.service.EmailService;
import com.ecommerce.FashionStore.service.UserService;
import com.ecommerce.FashionStore.service.impl.TokenServiceImpl;
import com.ecommerce.FashionStore.service.impl.UserDetailsServiceImpl;
import com.ecommerce.FashionStore.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final TokenServiceImpl tokenService;
    private final RoleRepository roleRepository;
    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
                          UserServiceImpl userService, UserRepository userRepository, EmailService emailService,
                          TokenRepository tokenRepository, TokenServiceImpl tokenService, RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.tokenRepository = tokenRepository;
        this.tokenService = tokenService;
        this.roleRepository = roleRepository;
    }
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/sign_in")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody SignInRequest signInRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getUsername(),
                            signInRequest.getPassword()
                    )
            );
            // Lấy thông tin User từ đối tượng Authentication
            User user = (User) authentication.getPrincipal();

            // Kiểm tra nếu tài khoản chưa được kích hoạt
            if (!user.getActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your account is not activated yet or blocked! Pls try contact with administrator");
            }
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(authentication);

            // Lưu token vào cơ sở dữ liệu
            Token token = new Token();
            token.setId(UUID.randomUUID().toString()); // Đặt id cho token
            token.setUser(user); // Liên kết token với user
            token.setToken(jwt); // Lưu giá trị token
            token.setCreateDate(LocalDateTime.now()); // Thời gian tạo token
            token.setExpireDate(jwtTokenProvider.getExpirationDateFromToken(jwt)); // Thời gian hết hạn của token
            tokenRepository.save(token); // Lưu token vào cơ sở dữ liệu


            String name = jwtTokenProvider.getUsernameFromJWT(jwt);
            String email = jwtTokenProvider.getEmailFromJWT(jwt);
            List<?> roles = jwtTokenProvider.getRolesFromJWT(jwt);
            return ResponseEntity.ok(new SignInResponse(jwt, name, email, roles, user.getImage()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid sign in");
        }
    }
    @PostMapping(value = "/sign_up", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignUpRequest signupRequest, HttpServletRequest request) {
        log.info("Received sign up request: {}", signupRequest);
        log.info("Request headers: {}", request.getHeaderNames().toString()); // Log all request headers
        if (userRepository.existsByEmail(signupRequest.getEmail()) ) {
            log.warn("Email already exists: {}", signupRequest.getEmail());
            return ResponseEntity.badRequest().body(new SignUpResponse("Email already exists"));
        }
        // Generate verification token
        String verificationToken = UUID.randomUUID().toString() ;

        User user = new User(signupRequest.getName(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()));
        user.setActive(false); // Set user as inactive until email is verified
        // Find or create USER_ROLE
        Role userRole = roleRepository.findByRole("ROLE_USER").orElseThrow(() -> new RuntimeException("User role not found"));
        if (userRole == null) {
            log.warn("User role not found, creating new role");
            userRole = new Role();
            userRole.setRole("USER_ROLE");
            roleRepository.save(userRole);
        }

        user.setRoles(Collections.singleton(userRole));
        userRepository.save(user);
        User u = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("User saved: {}", u);
        // Lưu token vào cơ sở dữ liệu
        Token token = new Token();
        token.setId(UUID.randomUUID().toString()); // Đặt id cho token
        token.setUser(user); // Liên kết token với user
        token.setToken(verificationToken); // Lưu giá trị token
        token.setCreateDate(LocalDateTime.now()); // Thời gian tạo token
        token.setExpireDate(LocalDateTime.now().plus(1, ChronoUnit.DAYS)); // Thời gian hết hạn của token
        tokenRepository.save(token); // Lưu token vào cơ sở dữ liệu
        log.info("Token saved: {}", token);
        // Send verification email
        emailService.sendVerificationEmail(user.getEmail(), verificationToken);
        log.info("Verification email sent to: {}", user.getEmail());
        return ResponseEntity.ok(new SignUpResponse("Please check your email for verification"));
    }

    @GetMapping("/secured")
    public ResponseEntity<?> securedEndpoint(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7); // Lấy token từ header Authorization
        if (tokenService.isTokenValid(token)) {
            // Xử lý yêu cầu
            return ResponseEntity.ok("Secured endpoint accessed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        User user = tokenService.getUserFromToken(token);
        if (user == null) {
            // Xử lý trường hợp token không hợp lệ
            return ResponseEntity.badRequest().body("Invalid token");
        }
        user.setActive(true);
        userRepository.save(user);

        // URL của trang verification-success trên React app
        String reactAppUrl = "http://localhost:3000/verification-success";

        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, reactAppUrl)
                .build();
    }

    @GetMapping("/verification-success")
    public String verificationSuccess(Model model) {
        // Thêm bất kỳ dữ liệu cần thiết vào Model
        return "verification-success";
    }
}
