package com.company;

import java.sql.*;

public class Main {

    public static void createTable(Connection conn) throws SQLException {
        java.sql.Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS users (id IDENTITY, name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS message (id IDENTITY, user_id INT, message VARCHAR)");
    }

    public static void insertUser(Connection conn, String name, String password) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users VALUES (NULL, ?, ?)");
        stmt.setString(1, name);
        stmt.setString(2, password);
        stmt.execute();
    }

    public static User selectUser(Connection conn, String name) throws SQLException {
        User user = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
        stmt.setString(1, name);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            user = new User();
            user.id = results.getInt("id");
            user.password = results.getString("password");
        }
        return user;
    }

    public static void insertMessage(Connection conn, int userId, String message) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO message VALUES (NULL, ?, ?)");
        stmt.setInt(1, userId);
        stmt.setString(2, message);
        stmt.execute();
    }

    public static Message selectMessage(Connection conn, int messageId) throws SQLException {
        Message message = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM message INNER JOIN users ON message.user_id = users.id WHERE message.id = ?");
        stmt.setInt(1, messageId);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            message = new Message();
            message.id = results.getInt("message.id");
            message.username = results.getString("users.name");
            message.message = results.getString("message.message");
        }
        return message;
    }

    public static void deleteMessage(Connection conn, int id) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM message WHERE id = ?");
        stmt.setInt(1, id);
        stmt.execute();
    }

    public static void main(String[] args) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTable(conn);

    }
}
