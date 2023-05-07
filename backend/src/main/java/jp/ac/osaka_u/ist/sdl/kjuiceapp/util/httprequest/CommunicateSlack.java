package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Properties;

public class CommunicateSlack {
    public static void sendMessage(String message) throws Exception{
        URL url;
        try{
            url = new URL("https://slack.com/api/chat.postMessage");
        }catch(MalformedURLException e){
            System.err.println(e);
            return;
        }

        Properties properties = new Properties();
        try {
            FileInputStream fis = new FileInputStream(new File("application.properties"));
            properties.load(fis);
        }catch(Exception e){
            e.printStackTrace();
        }
        // ResourceBundle rb = null;
        // try{
        //     rb = ResourceBundle.getBundle("application");
        // }catch(MissingResourceException e){
        //     e.printStackTrace();
        //     return;
        // }

        String postData="token="+properties.getProperty("SLACK_TOKEN")+"&channel="+properties.getProperty("SLACK_CHANNEL")+"&text="+URLEncoder.encode(message,"UTF-8");

        URLConnection conn;
        try{
            conn = url.openConnection();
        }catch(IOException e){
            System.err.println(e);
            return;
        }
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        conn.setRequestProperty("Content-Length", Integer.toString(postData.length()));

        try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())) {
            dos.writeBytes(postData);
        }
 
        try (BufferedReader bf = new BufferedReader(new InputStreamReader(
                                                        conn.getInputStream())))
        {
            String line;
            while ((line = bf.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
