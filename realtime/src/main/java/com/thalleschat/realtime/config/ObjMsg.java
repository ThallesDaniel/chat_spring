package com.thalleschat.realtime.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ObjMsg {
    private String userId;
    private String userName;
    private String userColor;
    private String content;
}