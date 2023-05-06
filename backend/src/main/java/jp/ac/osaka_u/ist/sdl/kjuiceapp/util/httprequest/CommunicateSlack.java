package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class CommunicateSlack {
    public static void sendMessage(String message) throws Exception{
        URL url;
        try{
            url = new URL("https://slack.com/api/chat.postMessage");
        }catch(MalformedURLException e){
            System.err.println(e);
            return;
        }

        String postData="token="+"&channel="+"&text="+URLEncoder.encode(message,"UTF-8");

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
