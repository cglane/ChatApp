package com.company;

/**
 * Created by landonkail on 11/5/15.
 */
public class User {
    int id;
    String username;
    String password;

    public User() {
    }

    public User(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
