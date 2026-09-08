# process tree 
---
### ا-Process Tree چیست؟

ا-**Process Tree** رابطه‌ی **Parent و Child Processها** را به شکل درختی نشان می‌دهد.

مثلاً:

```
systemd (PID 1)
├── sshd (PID 500)
│   └── bash (PID 600)
│       └── python (PID 700)
└── nginx (PID 800)
    ├── nginx worker (PID 801)
    └── nginx worker (PID 802)
```

اینجا:

- `systemd` → Parentِ `sshd` و `nginx`
- `sshd` → Parentِ `bash`
- `bash` → Parentِ `python`
- `nginx` → Parentِ workerها

رابطه با PID و PPID:

```
python
PID  = 700
PPID = 600
```

یعنی Process با PID `600`، Parentِ Process `700` است.

### چطور ببینیم؟

با `ps`:

```
ps -ef --forest
```

یا:

```
pstree
```
- این دستور pstree خیلی دستور مهم است
و در `htop`:

```
F5
```

را بزن.

**چرا مهم است؟**  
چون وقتی یک Process مشکل دارد، با Process Tree می‌توانی بفهمی **چه کسی آن را اجرا کرده و چه Childهایی دارد**. این برای troubleshooting و مدیریت Processها خیلی مهم است.
