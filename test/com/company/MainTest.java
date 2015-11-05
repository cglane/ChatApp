package com.company;

import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * Created by landonkail on 11/5/15.
 */
public class MainTest {
    public Connection startConnection() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./test");
        Main.createTable(conn);
        return conn;
    }

    public void endConnection(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("DROP TABLE users");
        stmt.execute("DROP TABLE message");
        conn.close();
    }
    ///////////////////////////////////////////////////

    @Test
    public void testUser() throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "Landon", "dog");
        User user = Main.selectUser(conn, "Landon");
        endConnection(conn);

        assertTrue(user != null);
    }

    @Test
    public void testMessage () throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "Landon", "dog");
        Main.insertMessage(conn, 1, "sup!");
        Message message = Main.selectMessage(conn, 1);
        endConnection(conn);

        assertTrue(message != null);
    }

    @Test
    public void testDeleteMessage () throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "Landon", "dog");
        Main.insertMessage(conn, 1, "YO YO YO");
        Message test = Main.selectMessage(conn, 1);
        ArrayList<Message> messageList = new ArrayList<>();
        messageList.add(test);
        messageList.remove(test);
        endConnection(conn);
        }
    }

