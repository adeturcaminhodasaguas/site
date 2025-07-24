package com.turismo.email.DTO.Request;

public record EmailRequest(
    String to,
    String subject,
    String body
) {} 
