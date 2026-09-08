# 2-PID
---
### ا-PID چیست؟

ا-**PID = Process ID**

یک **شماره‌ی یکتا** است که Linux به هر Process می‌دهد تا بتواند آن را شناسایی و مدیریت کند.

مثلاً:

```
Program: firefox
       ↓
Process
       ↓
PID = 1234
```

حالا می‌توانی با PID آن Process را بررسی یا کنترل کنی:

```
ps -p 1234
kill 1234
```

یعنی:

>ا- **PID شناسه‌ی هر Process در Linux است.**

مثلاً اگر `htop` را باز کنی:

```
PID    USER    CPU%   COMMAND
1234   arian   20%    firefox
5678   root     2%    sshd
```

اینجا `1234` شناسه‌ی Process مربوط به Firefox است.
