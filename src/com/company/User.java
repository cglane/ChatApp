package com.company;

/**
 * Created by landonkail on 11/5/15.
 */
public class User {
    int _id;
    String username;
    String password;

    public User() {
    }

    public User(int id, String username, String password) {
        this._id = id;
        this.username = username;
        this.password = password;
    }

    public int get_id() {
        return _id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
