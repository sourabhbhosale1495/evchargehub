package com.evchargehub.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.evchargehub.backend.entity.Payment;
import com.evchargehub.backend.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ==============================
    // CREATE PAYMENT
    // ==============================

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {

        return paymentService.createPayment(payment);
    }

    // ==============================
    // GET ALL PAYMENTS
    // ==============================

    @GetMapping
    public List<Payment> getAllPayments() {

        return paymentService.getAllPayments();
    }

    // ==============================
    // GET PAYMENT BY ID
    // ==============================

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {

        return paymentService.getPaymentById(id);
    }

    // ==============================
    // UPDATE PAYMENT STATUS
    // ==============================

    @PutMapping("/{id}/status")
    public Payment updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return paymentService.updatePaymentStatus(id, status);
    }

    // ==============================
    // DELETE PAYMENT
    // ==============================

    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {

        paymentService.deletePayment(id);

        return "Payment deleted successfully";
    }
}
