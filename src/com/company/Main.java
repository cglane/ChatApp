package com.company;

import jodd.json.JsonSerializer;
import spark.Session;
import spark.Spark;

import java.sql.*;
import java.util.ArrayList;

public class Main {

    public static void createTable(Connection conn) throws SQLException {
        java.sql.Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS users (_id IDENTITY, name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS message (_id IDENTITY, sender_id INT, receiver_id INT, message VARCHAR)");
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
            user._id = results.getInt("_id");
            user.username = results.getString("name");
            user.password = results.getString("password");
        }
        return user;
    }

    public static User selectUser(Connection conn, int id) throws SQLException {
        User user = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE _id = ?");
        stmt.setInt(1, id);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            user = new User();
            user._id = results.getInt("_id");
            user.username = results.getString("name");
            user.password = results.getString("password");
        }
        return user;
    }

    public static ArrayList<User> selectUsers(Connection conn) throws SQLException {
        ArrayList<User> users = new ArrayList<>();
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            User user = new User();
            user._id = results.getInt("_id");
            user.username = results.getString("name");
            user.password = results.getString("password");
            users.add(user);
        }
        return users;
    }

    public static void insertMessage(Connection conn, int senderId, int receiverId, String message) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO message VALUES (NULL, ?, ?, ?)");
        stmt.setInt(1, senderId);
        stmt.setInt(2, receiverId);
        stmt.setString(3, message);
        stmt.execute();
    }

    public static Message selectMessage(Connection conn, int messageId) throws SQLException {
        Message message = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM message INNER JOIN users ON message.sender_id = users._id WHERE message._id = ?");
        stmt.setInt(1, messageId);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            message = new Message();
            message._id = results.getInt("message._id");
            message.username = results.getString("users.name");
            message.message = results.getString("message.message");
        }
        return message;
    }

    public static ArrayList<Message> selectMessages(Connection conn) throws SQLException {
        ArrayList<Message> replies = new ArrayList<>();
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM message INNER JOIN users ON message.sender_id = users._id");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            Message message = new Message();
            message._id = results.getInt("message._id");
            message.message = results.getString("message.message");
            message.username = results.getString("users.name");
            int receiverId = results.getInt("message.receiver_id");
            User receiver = selectUser(conn, receiverId);
            message.recipient = receiver.username;
            replies.add(message);
        }
        return replies;
    }

    public static void deleteMessage(Connection conn, int id) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM message WHERE _id = ?");
        stmt.setInt(1, id);
        stmt.execute();
    }

    // public static void

    public static void main(String[] args) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");

        createTable(conn);

        Spark.externalStaticFileLocation("client");

        if (selectUsers(conn).size() == 0) {
            insertUser(conn, "Landon", "");
            insertUser(conn, "Matt", "");
            insertUser(conn, "David", "");
            insertUser(conn, "Tim", "");
        }

        if (selectMessages(conn).size() == 0) {
            insertMessage(conn, 1, 2, "Hello this is a message");
            insertMessage(conn, 1, 2, "What up");
            insertMessage(conn, 1, 2, "YO YOU YO");
        }

        Spark.post(
                "/login",
                ((request, response) -> {
                    Session session = request.session();

                    String username = request.queryParams("username");
                    String password = request.queryParams("password");

                    if (username.isEmpty() || password.isEmpty()) {
                        Spark.halt(403);
                    }

                    User user = selectUser(conn, username);
                    if (user == null) {
                        insertUser(conn, username, password);
                    } else if (!password.equals(user.password)) {
                        Spark.halt(403);
                    }

                    session.attribute("username", username);
                    return "";
                })
        );

        Spark.get(
                "/get-message",
                ((request, response) -> {
                    String id = request.queryParams("_id");
                    try {
                        int idNum = Integer.valueOf(id);
                        JsonSerializer serializer = new JsonSerializer();
                        String json = serializer.serialize(selectMessage(conn, idNum));
                        return json;
                    }catch (Exception e) {

                    }
                    return "";
                })
        );

        Spark.get(
                "/get-messages",
                ((request, response) -> {
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.serialize(selectMessages(conn));
                    return json;
                })
        );

        Spark.get(
                "/get-users",
                ((request, response) -> {
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.serialize(selectUsers(conn));
                    return json;
                })
        );

        Spark.post(
                "/send-message",
                ((request, response) -> {
                    String message = request.queryParams("message");
                    String id = request.queryParams("senderId");
                    String id2 = request.queryParams("receiverId");


                    try {
                        int idSenderNum = Integer.valueOf(id);
                        int idReceiverNum = Integer.valueOf(id2);
                        if (message == null) {
                            Spark.halt(403);
                        }
                        insertMessage(conn, idSenderNum, idReceiverNum, message);
                    } catch (Exception e) {

                    }
                    return "";
                })
        );

        Spark.post(
                "/delete-message",
                ((request, response) -> {
                    String id = request.queryParams("_id");
                    try {
                        int idNum = Integer.valueOf(id);
                        deleteMessage(conn, idNum);
                    } catch (Exception e) {

                    }
                    return "";
                })
        );

    }
}
