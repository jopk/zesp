package qr.qrget;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;


public class MainActivity extends ActionBarActivity {

    TextView urlek,cns;
    Button downl,opfd;
    String dupa,file_name,folder_name;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent= getIntent();
        String url = intent.getDataString();
        urlek = (TextView) findViewById(R.id.url);
        cns = (TextView) findViewById(R.id.console);
        downl = (Button) findViewById(R.id.downloadbtn);
        opfd = (Button) findViewById(R.id.folder_button);
        urlek.setText(url);
        downl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Download();
            }
        });

        opfd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                OpenFolder();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void Download() {
        //urlek.setText("download");
        try{
            dupa="1";
            cns.setText(dupa);
            URL u = new URL((String) urlek.getText());
            dupa="2";
            cns.setText(dupa);
            InputStream is = u.openStream();
            folder_name = "Qrget";
            file_name = "20.jpg";
            cns.setText(file_name);
            DataInputStream dis = new DataInputStream(is);
            dupa="3";
            cns.setText(dupa);
            byte[] buffer = new byte[1024];
            int length;
            dupa="4";
            cns.setText(dupa);
            cns.setText(Environment.getExternalStorageDirectory() + "/" + folder_name + "/" + file_name);
            FileOutputStream fos = new FileOutputStream(new File(Environment.getExternalStorageDirectory() + "/" + folder_name + "/" + file_name ));
            while ((length = dis.read(buffer))>0) {
                fos.write(buffer, 0, length);
            }
        }
        catch (MalformedURLException mue) {
            Log.e("SYNC getUpdate", "malformed url error", mue);
        }
        catch (IOException ioe) {
            Log.e("SYNC getUpdate", "io error", ioe);
        }
        catch (SecurityException se) {
            Log.e("SYNC getUpdate", "security error", se);
        }
    }
    public void OpenFolder(){
        urlek.setText("folder");
    }
}
