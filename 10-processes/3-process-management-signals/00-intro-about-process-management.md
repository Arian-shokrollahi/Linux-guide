ا-**Process Management** یعنی توانایی مشاهده، کنترل و مدیریت Processهایی که روی Linux در حال اجرا هستند. یکی از ابزارهای مهم برای این کار `htop` و یکی از روش‌های اصلی کنترل Processها، استفاده از **Signal**هاست. با Signal می‌توانیم به یک Process پیام‌هایی مثل «متوقف شو»، «ادامه بده» یا «خودت را خاتمه بده» ارسال کنیم. برای مدیریت درست Processها باید هم نحوه‌ی شناسایی آن‌ها و هم نحوه‌ی ارسال و رفتار Signalها را بلد باشیم.

### چیزهایی که در این بخش باید بلد باشی

| #   | موضوع                       | چیزی که باید بلد باشی                              |
| --- | --------------------------- | -------------------------------------------------- |
| 1   | **Process چیست؟**           | مفهوم Process و تفاوتش با Program                  |
| 2   | **PID**                     | پیدا کردن و استفاده از Process ID                  |
| 3   | **Parent / Child Process**  | ارتباط Processها با یکدیگر                         |
| 4   | **Process State**           | حالت‌های `R`, `S`, `D`, `T`, `Z`                   |
| 5   | **Signal چیست؟**            | مفهوم Signal و کاربرد آن                           |
| 6   | **ارسال Signal**            | استفاده از `kill` و `pkill`                        |
| 7   | **SIGTERM**                 | خاتمه‌ی graceful و قابل مدیریت                     |
| 8   | **SIGKILL**                 | خاتمه‌ی اجباری و غیرقابل catch                     |
| 9   | **SIGINT**                  | مفهوم `Ctrl+C`                                     |
| 10  | **SIGSTOP / SIGCONT**       | متوقف و دوباره اجرا کردن Process                   |
| 11  | **Signal Handling**         | اینکه Process چگونه به Signal واکنش نشان می‌دهد    |
| 12  | **Permissions**             | چه کسی اجازه‌ی ارسال Signal به Process را دارد     |
| 13  | **Process Priority**        | مفهوم `nice` و `renice`                            |
| 14  | **CPU / RAM Management**    | پیدا کردن Processهای پرمصرف                        |
| 15  | **Process Tree**            | دیدن ارتباط Parent و Child                         |
| 16  | **Monitoring**              | استفاده از `ps`, `top`, `htop`                     |
| 17  | **Killing Processes**       | چه زمانی `SIGTERM` و چه زمانی `SIGKILL`            |
| 18  | **Zombie Processes**        | Zombie چیست و چرا ایجاد می‌شود                     |
| 19  | **Background / Foreground** | مدیریت Processهای Shell با `&`, `jobs`, `fg`, `bg` |
| 20  | **Service Management**      | ارتباط Processها با `systemd` و `systemctl`        |

### اگر بخوای اصولی یاد بگیری، ترتیب پیشنهادی من:

**Process → PID → Process State → Process Tree → Signal → `kill` → SIGTERM → SIGKILL → SIGSTOP/SIGCONT → `ps`/`htop` → nice/renice → jobs/fg/bg → systemd**

اگر این مسیر رو بلد باشی، بخش **Process Management در Linux** رو در حد خوبی برای کارهای Administration پوشش دادی.
