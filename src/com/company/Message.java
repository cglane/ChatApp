package com.company;

import java.time.LocalDateTime;

/**
 * Created by landonkail on 11/5/15.
 */
public class Message {
    int id;
    String message;
    String username;
    String recipient;

    public int getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return username;
    }

    public String getRecipient() {
        return recipient;
    }
}
