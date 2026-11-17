package com.evchargehub.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.evchargehub.backend.entity.Payment;
import com.evchargehub.backend.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }


    // ==============================
    // CREATE PAYMENT
    // ==============================

    public Payment createPayment(Payment payment) {

        if (payment.getPaymentTime() == null) {
            payment.setPaymentTime(LocalDateTime.now());
        }

        if (payment.getPaymentStatus() == null) {
            payment.setPaymentStatus("PENDING");
        }

        return paymentRepository.save(payment);
    }


    // ==============================
    // GET ALL PAYMENTS
    // ==============================

    public List<Payment> getAllPayments() {

        return paymentRepository.findAll();
    }


    // ==============================
    // GET PAYMENT BY ID
    // ==============================

    public Payment getPaymentById(Long id) {

        return paymentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Payment not found")
                );
    }


    // ==============================
    // UPDATE PAYMENT STATUS
    // ==============================

    public Payment updatePaymentStatus(
            Long id,
            String status) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Payment not found")
                );

        payment.setPaymentStatus(status);

        return paymentRepository.save(payment);
    }


    // ==============================
    // DELETE PAYMENT
    // ==============================

    public void deletePayment(Long id) {

        if (!paymentRepository.existsById(id)) {

            throw new RuntimeException(
                "Payment not found"
            );
        }

        paymentRepository.deleteById(id);
    }
}