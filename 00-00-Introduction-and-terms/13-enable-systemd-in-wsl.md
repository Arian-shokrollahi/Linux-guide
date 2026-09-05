# 13-enable systemd in wsl
---
# فعال‌کردن `systemd` در WSL

## مرحله اول: بررسی نسخه WSL

در **PowerShell ویندوز** اجرا کن:
```bash
wsl --version
```
- همچنین توزیع‌های نصب‌شده را ببین:
```bash
wsl -l -v
```
- بهتر است ستون `VERSION` برای توزیع لینوکست مقدار `2` باشد.

اگر WSL قدیمی است، آن را به‌روزرسانی کن:
```bash
wsl --update
```
- اگر توزیع روی WSL 1 است، آن را به WSL 2 تبدیل کن. مثلاً برای Ubuntu:
```bash
wsl --set-version Ubuntu 2
```
اگر نام توزیع تو متفاوت است، ابتدا نام دقیق آن را با `wsl -l -v` پیدا کن

---
## مرحله دوم: ویرایش فایل `/etc/wsl.conf`

- داخل WSL این دستور را اجرا کن:
```bash
sudo nano /etc/wsl.conf
```
- این محتوا را داخل فایل قرار بده:
```bash
[boot]
systemd=true
```
- محتوای فایل را بررسی کن:
```bash
cat /etc/wsl.conf
```
- باید اینو ببینی
```bash
[boot]
systemd=true
```


---
## مرحله سوم: خاموش‌کردن کامل WSL

این دستور را باید در **PowerShell ویندوز** اجرا کنی، نه داخل Linux:
```bash
`wsl --shutdown'
```

این کار تمام Instanceهای WSL را خاموش می‌کند.

حالا دوباره Ubuntu یا توزیع لینوکست را باز کن.

---
### راه هایه فهمیدن اینکه فعاله یا نه systemd

- 1- اینو در در ترمیناله توزیعت بزن در wsl
```bash
ps -p 1 -o comm=

```
- اگر خروجی systemd بود یعنی systemd روش فعاله
- 2- اینو بزنید
```bash
systemctl is-system-running
---->out
running
```
اگر بزنه running یعنی درسته
