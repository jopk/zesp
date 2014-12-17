#!/usr/bin/perl -w
#T

use strict;
use CGI;
use CGI::Carp qw ( fatalsToBrowser );
use File::Basename;

$CGI::POST_MAX = 1024 * 5000;
my $safe_filename_characters = "a-zA-Z0-9_.-%";
my $upload_dir = "../tmp";
my $qrdir = "../qr";

my $query = new CGI;
my $filename = $query->param("file");
my $email_address = $query->param("file_name");

if (!$filename) {
   print $query->header();
   print "Problem z przesyłaniem twojego pliku! Spróbuj wysłać mniejszy plik.";
   exit;
}
if (!$email_address) {
   print $query->header();
   print "Proble2m z przesyłaniem twojego pliku! Spróbuj wysłać mniejszy plik.";
   exit;
}

my ( $name, $path, $extension ) = fileparse ( $filename, '..*' );
$filename = $name . $extension;
$filename =~ tr/ /_/;
$filename =~ s/[^$safe_filename_characters]//g;

if ( $filename =~ /^([$safe_filename_characters]+)$/ ) {
    $filename = $1;
} else {
   die "Nazwa pliku zawiera niedozwolone znaki";
}

my $upload_filehandle = $query->upload("file");

open (UPLOADFILE, ">$upload_dir/$filename") or die "$!";
binmode UPLOADFILE;

while (<$upload_filehandle>) {
    print UPLOADFILE;
}

close UPLOADFILE;

print $query->header ( );

system("./qrencode", "-s", "5", "-o", "$qrdir/$filename", "http://mcz.0x.no:9080/zesp/$upload_dir/$filename");
# system("echo", "test");
print <<END_HTML;
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Thanks!</title>
<style type="text/css">
img {border: none;}
</style>
</head>
<body>
<p>Dzięki za wysłanie pliku!</p>
<p>Opis twojego pliku: $email_address</p>
<p>Twój plik:</p>
<p><img src="$qrdir/$filename" alt="plik" /></p>
</body>
</html>
END_HTML

