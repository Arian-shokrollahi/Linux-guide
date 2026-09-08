# htop command
----
# مهم ترین دستوری که باید یاد بگیرید درون لینوکس
---
# ا-`htop` چیست؟

ا-`htop` یک **interactive process viewer** است؛ یعنی بهت اجازه می‌دهد Processهای در حال اجرای سیستم را به‌صورت زنده ببینی و تحلیل کنی.

در واقع اگر `ps` را برای **گرفتن یک snapshot از Processها** در نظر بگیریم:

```
ps aux
```

ا-`htop` بیشتر برای **مانیتورینگ زنده و تعاملی** مناسب است:

```
htop
```

اگر نصب نباشد:

```
sudo apt install htop
```

---

# 1. اجرای htop

ساده‌ترین حالت:

```
htop
```

صفحه‌ای شبیه این می‌بینی:

```
CPU[||||||||              30%]
Mem[||||||||||||          45%]
Swp[                      0%]

  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
 1234 arian      20   0  500M  120M   10M S 12.3  1.5   0:20  firefox
 2311 root       20   0  100M   20M    5M S  2.1  0.2   0:05  sshd
```

حالا مهم‌ترین قسمت‌ها را یکی‌یکی یاد بگیریم.

---

# 2. قسمت CPU

بالای صفحه معمولاً CPUها را می‌بینی:

```
CPU0 [|||||||||       30%]
CPU1 [||||||||        25%]
CPU2 [|||||||||||||   40%]
```

اگر مثلاً:

```
CPU [||||||||||||||||||||] 100%
```

یعنی CPU کاملاً درگیر است.

### نکته مهم

اگر سیستم مثلاً 8 Core داشته باشد، ممکن است هر Core وضعیت جداگانه‌ای داشته باشد.

پس اگر:

```
CPU0 100%
CPU1 5%
CPU2 4%
...
```

لزومی ندارد کل سیستم CPU-bound باشد؛ ممکن است فقط یک Core شدیداً درگیر باشد.

---

# 3. Memory

قسمت:

```
Mem[|||||||||||||       45%]
```

مصرف RAM را نشان می‌دهد.

و:

```
Swp[||||                10%]
```

مصرف **Swap** را نشان می‌دهد.

اگر Swap شدیداً درگیر باشد، ممکن است سیستم به دلیل کمبود RAM وارد **memory pressure** شده باشد.

---

# 4. Process List

قسمت اصلی صفحه Processها هستند.

مثلاً:

```
PID    USER    PRI  NI   VIRT   RES   SHR  S  CPU% MEM%  TIME+   Command
```

مهم‌ترین ستون‌ها:

|ستون|معنی|
|---|---|
|PID|شناسه Process|
|USER|صاحب Process|
|PRI|Priority|
|NI|Nice value|
|VIRT|Virtual memory|
|RES|RAM واقعی مورد استفاده|
|SHR|Shared memory|
|S|وضعیت Process|
|CPU%|مصرف CPU|
|MEM%|مصرف RAM|
|TIME+|CPU time|
|Command|دستور/برنامه|

---

# 5. PID

مثلاً:

```
1234
```

این **Process ID** است.

هر Process یک PID دارد.

مثلاً:

```
PID
1
500
1234
2311
```

ا-PID `1` در Linux معمولاً Process اولیه سیستم (`init`/`systemd`) است.

---

# 6. USER

مثلاً:

```
root
arian
www-data
```

یعنی Process متعلق به کدام User است.

مثلاً:

```
root      sshd
arian     firefox
www-data  nginx
```

این موضوع در بحث **Permission** خیلی مهم است.

---

# 7. CPU%

مثلاً:

```
CPU%
45.2
20.1
5.3
```

نشان می‌دهد هر Process چه مقدار CPU مصرف می‌کند.

برای پیدا کردن Processهای CPU-heavy:

**F6** را بزن و:

```
CPU%
```

را انتخاب کن.

یا در بعضی نسخه‌ها با:

```
P
```

بر اساس CPU مرتب می‌شود.

پس اگر سیستم کند شده، یکی از اولین کارها:

```
htop
↓
sort by CPU
↓
پیدا کردن Process پرمصرف
```

---

# 8. MEM%

مثلاً:

```
MEM%
12.5
8.3
2.1
```

نشان‌دهنده درصد RAM مصرفی Process است.

برای پیدا کردن برنامه‌ای که RAM زیادی مصرف می‌کند:

```
htop
↓
sort by MEM%
```

معمولاً کلید:

```
M
```

برای مرتب‌سازی بر اساس Memory استفاده می‌شود.

---

# 9. State

ستون:

```
S
```

خیلی مهم است.

ممکن است ببینی:

```
R
S
D
T
Z
I
```

معنی‌های مهم:

### `R` — Running

Process در حال اجرا روی CPU است.

```
R
```

### `S` — Sleeping

Process فعلاً منتظر چیزی است.

```
S
```

این حالت کاملاً عادی است.

### `D` — Uninterruptible Sleep

معمولاً Process منتظر I/O است؛ مثلاً Disk یا بعضی عملیات kernel.

```
D
```

اگر تعداد زیادی Process در `D` باشند، باید به I/O و Storage شک کنی.

### `T` — Stopped

Process متوقف شده.

### `Z` — Zombie

Process تمام شده ولی parent هنوز exit status آن را جمع نکرده.

```
Z
```

Zombieهای زیاد می‌توانند نشانه مشکل در Process management باشند.

---

# 10. VIRT vs RES

این قسمت برای تحلیل Memory خیلی مهم است.

مثلاً:

```
VIRT   RES
10G    500M
```

ممکن است فکر کنی Process ده گیگ RAM مصرف کرده.

**اشتباه است.**

### VIRT

کل Virtual Address Space را نشان می‌دهد.

ممکن است شامل:

- memory mappings
- shared libraries
- allocated but unused memory
- swapped memory
- virtual address space

باشد.

### RES

Resident Set Size است؛ یعنی تقریباً مقدار Memoryای که واقعاً در RAM قرار دارد.

برای بررسی مصرف واقعی RAM معمولاً `RES` مهم‌تر است.

---

# 11. Search کردن Process

یکی از قابلیت‌های خیلی خوب `htop`:

```
F3
```

بعد مثلاً:

```
firefox
```

را search می‌کنی.

یا:

```
sshd
```

و Process مربوطه پیدا می‌شود.

---

# 12. Filter

با:

```
F4
```

می‌توانی Processها را filter کنی.

مثلاً:

```
python
```

و فقط Processهای مربوط به Python را ببینی.

---

# 13. Tree View

این یکی **خیلی مهمه**.

با:

```
F5
```

Processها به شکل Parent/Child نمایش داده می‌شوند:

```
systemd
 ├─ sshd
 │   └─ bash
 │       └─ python
 ├─ nginx
 │   ├─ nginx
 │   └─ nginx
 └─ docker
     └─ containerd
```

این برای فهمیدن **Process hierarchy** فوق‌العاده است.

مثلاً:

```
bash
 └── python
      └── worker
```

یعنی `python` توسط `bash` ایجاد شده و `worker` توسط Python.

---

# 14. Kill کردن Process

یکی از مهم‌ترین قابلیت‌های `htop`.

Process را انتخاب کن:

```
↑ ↓
```

بعد:

```
F9
```

صفحه‌ای برای Signalها می‌آید.

مثلاً:

```
SIGTERM
SIGKILL
SIGHUP
SIGSTOP
SIGCONT
```

### SIGTERM

```
SIGTERM
```

درخواست محترمانه برای terminate شدن Process.

معمولاً اولین انتخاب است.

### SIGKILL

```
SIGKILL
```

Process را فوراً می‌کشد.

این Signal را Process نمی‌تواند catch یا ignore کند.

پس ترتیب معمول:

```
SIGTERM
   ↓
اگر جواب نداد
   ↓
SIGKILL
```

---

# 15. Nice و Priority

در `htop` این دو ستون را می‌بینی:

```
PRI
NI
```

### NI

Nice value است.

معمولاً:

```
-20 ... 0 ... +19
```

هرچه Nice بالاتر باشد، Process معمولاً CPU priority پایین‌تری دارد.

مثلاً:

```
NI = 19
```

یعنی Process نسبتاً low priority است.

و:

```
NI = -10
```

یعنی priority بالاتری دارد.

---

# 16. تغییر Priority

در `htop` می‌توانی Process را انتخاب کنی و با:

```
F7
```

Nice value را پایین بیاوری.

و:

```
F8
```

Nice value را بالا ببری.

برای تغییر priority به مقادیر منفی معمولاً permission مناسب، مثل root، لازم است.

---

# 17. F6 — Sort

این یکی را خوب یاد بگیر:

```
F6
```

می‌توانی Processها را بر اساس موارد مختلف مرتب کنی:

```
CPU%
MEM%
PID
USER
TIME+
...
```

مثلاً برای troubleshooting:

```
F6
↓
CPU%
```

یا:

```
F6
↓
MEM%
```

---

# 18. Command Line

گاهی فقط اسم برنامه کافی نیست.

مثلاً می‌بینی:

```
python
```

اما نمی‌دانی دقیقاً چه کاری انجام می‌دهد.

در `htop` می‌توانی command line را ببینی تا مثلاً:

```
python /home/user/app/server.py --port 8080
```

را ببینی.

این برای troubleshooting خیلی کاربردی است.

---

# 19. Threads

یکی از قابلیت‌های مهم `htop` این است که می‌توانی Threadها را هم مشاهده کنی.

از Setup:

```
F2
```

و قسمت مربوط به نمایش threadها را تنظیم کن.

چون بعضی برنامه‌ها مثل:

```
Java
Chrome
Firefox
PostgreSQL
```

تعداد زیادی Thread دارند.

---

# 20. Setup — F2

با:

```
F2
```

وارد تنظیمات `htop` می‌شوی.

اینجا می‌توانی چیزهایی مثل:

- Meterها
- ستون‌ها
- نمایش CPU
- نمایش Memory
- نمایش Processها
- رنگ‌بندی
- Tree mode
- Thread display

را تنظیم کنی.

اگر می‌خواهی `htop` را حرفه‌ای یاد بگیری، **F2 مهم است**.

---

# 21. مهم‌ترین کلیدهای htop

این‌ها را فعلاً حفظ کن:

```
htop
```

|Key|کار|
|---|---|
|`F1`|Help|
|`F2`|Setup|
|`F3`|Search|
|`F4`|Filter|
|`F5`|Tree|
|`F6`|Sort|
|`F9`|Kill / Signal|
|`F10`|Quit|
|`Space`|Tag کردن Process|
|`u`|نمایش Processهای یک User|
|`P`|Sort بر اساس CPU|
|`M`|Sort بر اساس Memory|
|`T`|Sort بر اساس CPU Time|
|`↑ ↓`|انتخاب Process|
|`q`|خروج|

---

# 22. یک سناریوی واقعی

فرض کن کاربر می‌گوید:

> سیستم خیلی کند شده.

تو:

```
htop
```

را اجرا می‌کنی.

### مرحله 1 — CPU

نگاه می‌کنی:

```
CPU 98%
```

پس احتمال CPU pressure وجود دارد.

بعد:

```
P
```

و می‌بینی:

```
PID   CPU%   Command
1234  97%    java
```

پس Java تقریباً کل CPU را گرفته.

---

### مرحله 2 — Memory

فرض کن CPU عادی شد ولی:

```
Mem 96%
Swap 80%
```

می‌فهمی مشکل احتمالاً Memory pressure است.

بعد:

```
M
```

و:

```
PID   MEM%   Command
5000  45%    java
3000  20%    firefox
```

---

### مرحله 3 — Process hierarchy

بعد:

```
F5
```

و می‌بینی:

```
systemd
 └── java
      ├── worker
      ├── worker
      ├── worker
      └── worker
```

اینجا دید خیلی بهتری نسبت به اینکه فقط `ps aux` ببینی داری.

---

# `ps` vs `htop`

این تفاوت را خیلی خوب در ذهنت نگه دار:

```
ps
│
├── snapshot
├── scripting
├── automation
├── دقیق و قابل parse
└── مناسب command line

htop
│
├── real-time
├── interactive
├── sort
├── search
├── filter
├── tree
├── kill
└── troubleshooting
```

مثلاً:

```
ps aux | grep nginx
```

برای script یا بررسی دقیق عالی است.

ولی وقتی می‌خواهی **زنده سیستم را زیر نظر بگیری**:

```
htop
```

خیلی راحت‌تر است
