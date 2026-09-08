# غیرفعال کردن پردازه هایه سرویسی که اسمش رو فقط میدونید 
---
## نیاز به substitution expansion دارید +pidof +kill
```bash
kill $(pidof servicename)
```
- 1-کیل kill متوقف میکند
- 2-با گسترش substitution خروجی دستور pidof رو میگیریم
- 3-دستور pidof هم شماره پردازه هایه اون سرویس رو میدهد
