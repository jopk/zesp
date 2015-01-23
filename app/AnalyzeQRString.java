package analyzer;

public class AnalyzeQRString {
    private static final int ADR = 8;
    private static final int SHA = 64;
    private static final int KEY = 48;

    AnalyzeQRString() {}

    static String[] analyzeQRString(String str) throws Exception {

        String server = str.substring(0, ADR);
        String path = "";
        if (server.substring(7).equals("S"))
            path = "http://mcz.0x.no:9080/zesp/tmp/";
        else {
            throw new Exception("Invalid QRCode: " + server.substring(7));
        }

        String type = str.substring(ADR, ADR + 1);
        String hash = str.substring(ADR + 1, ADR + SHA); 
        path = path.concat(hash);
        String key = str.substring(ADR + SHA + 1, ADR + SHA + KEY);
        String name = str.substring(ADR + SHA + KEY + 1);

        String[] data = new String[4];
        data[0] = path;
        data[1] = key;
        data[2] = name;
        data[3] = type;

        return data;
    }

	public static void main(String[] args) {
        if (args.length != 1)
            return;

        try {
            String[] data = analyzeQRString(args[0]);
            System.out.println("ścieżka: " + data[0]);
            System.out.println("klucz: " + data[1]);
            System.out.println("nazwa: " + data[2]);
            System.out.println("typ: " + data[3]);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

}
