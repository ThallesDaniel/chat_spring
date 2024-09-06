package com.thalleschat.realtime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thalleschat.realtime.config.ObjMsg;

@Controller
public class App {

    @MessageMapping("/chatMessage")
    @SendTo("/canal")
    public ObjMsg sendMessage(ObjMsg message){
        return message;
    }

}