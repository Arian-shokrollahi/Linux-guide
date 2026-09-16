scp

scp مخفف Secure Copy است و برای انتقال فایل و دایرکتوری بین سیستم‌ها از طریق SSH استفاده می‌شود. یعنی همان SSH، ولی به‌جای اجرای Shell، فایل را جابه‌جا می‌کند.

Syntax
scp [options] source destination
حالت‌های اصلی
1. Local → Remote
scp file.txt user@server:/home/user/
# Copy file to remote server
2. Remote → Local
scp user@server:/home/user/file.txt .
# Copy file from remote server
3. Remote → Remote
scp user@server1:/tmp/file.txt user@server2:/tmp/
# Copy between two remote servers
4. انتقال دایرکتوری
scp -r mydir/ user@server:/home/user/
# Copy directory recursively
مهم‌ترین Switchها
Switch	کاربرد
-r	انتقال دایرکتوری به‌صورت Recursive
-P <port>	مشخص کردن SSH Port
-i <key>	استفاده از SSH Private Key
-p	حفظ permission و timestamp فایل
-v	نمایش جزئیات برای Debug
-q	Quiet؛ کاهش خروجی
-C	فشرده‌سازی هنگام انتقال
-3	انتقال Remote → Remote از طریق سیستم Local

⚠️ دقت کن در scp، پورت با -P بزرگ مشخص می‌شود؛ در ssh از -p کوچک استفاده می‌کنیم.

⭐⭐⭐ ۳ کاربرد پرکاربرد
1. ارسال فایل به Server
scp app.conf user@server:/etc/myapp/
2. دریافت فایل از Server
scp user@server:/var/log/app.log .
3. ارسال یک Directory
scp -r project/ user@server:/opt/
🔑 با SSH Key و Port سفارشی
scp -i ~/.ssh/id_ed25519 -P 2222 app.tar.gz user@server:/tmp/

یعنی:

-i       → SSH Private Key
-P 2222  → SSH Port
app.tar.gz → فایل
/tmp/    → مقصد
تفاوت ssh و scp
Command	کاربرد
ssh	اتصال و اجرای دستورات روی Remote
scp	انتقال فایل
sftp	انتقال تعاملی فایل

خلاصه:
ssh → Login
scp → Copy
sftp → File Transfer Session
