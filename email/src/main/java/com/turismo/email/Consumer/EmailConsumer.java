package com.turismo.email.Consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.turismo.email.DTO.Request.EmailRequest;
import com.turismo.email.Service.EmailService;

@Component
public class EmailConsumer {

    @Autowired
    private EmailService emailService;


    @RabbitListener(queues = "${spring.rabbit.queue.name}")
    public void consumirEmail(@Payload EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest);
    }
}
