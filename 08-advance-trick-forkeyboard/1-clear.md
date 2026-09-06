# clear or cls command
---
## دستور clear چیست ؟
دستور clear برایه پاک کردن صحفه ترمینال استفاده میشود

## شورت کاتی که من برایه دستور clear درست کردم:
- 1-میرید با ویرایشگر متنتون داخل bashrc./~  --->مثلا nano ~/.bashrc
- 2- یه شورت کات باحال برای (nano) این دو کلید رو میزنید تا برید اخر bashrc--> کلید اسلش/  به همراه alt که برید اخرش
- 3- حالا در خط اخط اضافه میکنید
```bash
nano ~/.bashrc
-->for last line
alt+/
-->
alias cls="clear"
ctl+x y enter
--->for reload bashrc
. .bashrc or source ~/.bashrc
```
