# Parent and Child process 
---
### ا-Parent و Child Process چیست؟

وقتی یک Process، Process دیگری را ایجاد می‌کند:

- ا-Process ایجادکننده → **Parent**
- ا-Process ایجادشده → **Child**

مثلاً:

```
bash (PID 1000)
   │
   └── python (PID 1200)
```

اینجا:

```
bash
PID  = 1000
       ↓
python
PID  = 1200
PPID = 1000
```

پس `python` یک **Child Process** از `bash` است و `bash` **Parent Process** آن است.

### چطور بفهمیم؟

با:

```
ps -ef
```

ستون‌های مهم:

```
PID    PPID
1200   1000
```

یعنی Process با PID `1200` توسط Process با PID `1000` ایجاد شده.

**خلاصه:**

> ا-**Parent = Processی که Child را ایجاد می‌کند**  
> ا-**Child = Processی که توسط Parent ایجاد شده**

این رابطه پایه‌ی **Process Tree** است.
