package com.company;

import java.time.LocalDateTime;

/**
 * Created by landonkail on 11/5/15.
 */
public class Message {
    int id;
    LocalDateTime time;
    String message;
    String username;

    public int getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public String getUsername() {
        return username;
    }
}
