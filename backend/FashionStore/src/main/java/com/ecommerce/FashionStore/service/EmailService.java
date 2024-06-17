package com.ecommerce.FashionStore.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String email, String verificationToken) {
        log.info("Sending verification email to: {}", email);

        String subject = "Please verify your email address";
        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + verificationToken;
        String body = "Dear user,\n\n"
                + "Thank you for registering with our application. Please click the following link to verify your email address:\n\n"
                + verificationLink + "\n\n"
                + "If you did not register with us, please ignore this email.\n\n"
                + "Regards,\n"
                + "Your Application Team";

        log.debug("Verification email subject: {}", subject);
        log.debug("Verification email body: {}", body);

        try {
            sendEmail(email, subject, body);
            log.info("Verification email sent successfully to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", email, e);
        }
    }
    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("20110131@student.hcmute.edu.vn"); // Replace with your email address
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        System.out.println("test: "+message);
        mailSender.send(message);
    }
}