package com.company;

import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import jodd.json.JsonSerializer;
import spark.Session;
import spark.Spark;

import java.sql.*;

public class Main {

    public static void createTable(Connection conn) throws SQLException {
        java.sql.Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS users (id IDENTITY, name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS message (id IDENTITY, sender_id INT, receiver_id INT, message VARCHAR)");
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

    public static void insertMessage(Connection conn, int senderId, int receiverId, String message) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO message VALUES (NULL, ?, ?, ?)");
        stmt.setInt(1, senderId);
        stmt.setInt(2, receiverId);
        stmt.setString(3, message);
        stmt.execute();
    }

    public static Message selectMessage(Connection conn, int messageId) throws SQLException {
        Message message = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM message INNER JOIN users ON message.sender_id = users.id WHERE message.id = ?");
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

    // public static void

    public static void main(String[] args) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");

        createTable(conn);

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
                    String id = request.queryParams("id");
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
                    String id = request.queryParams("id");
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
