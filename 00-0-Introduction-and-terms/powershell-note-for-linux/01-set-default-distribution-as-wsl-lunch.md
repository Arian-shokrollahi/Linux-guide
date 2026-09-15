# ست کردن اون توزیع به عنوان پیشفرض که wsl میزنی اون توزیع باز شه
---
1. اول یک wsl -l -v
```bash
PS C:\Users\Test> wsl -l -v
  NAME          STATE           VERSION
* Ubuntu        Stopped         2
  kali-linux    Stopped         2
```
2. چیزی شبیه این نشون میده که اونی که پشتش * داره یعنی همون توزیعی است که به طور پیش فرض نصب شده
3. حالا که توزیع هارو با اسمشونو دیدی 
4. با این ساختار اون توزیع که میخوای رو پیشفرض کن تاهروقت wsl میزنی اون بیاد
```powershell
wsl --set-default nameontozi
```
