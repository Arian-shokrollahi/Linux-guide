
---
## چیکار کنیم تا بتونیم بین ویندوز که هاستمون است و لینوکس که گست یا مهمانه سیستممون است بتونیم کپی پیست کنیم از هاست به گست
بعد از بالا اومدن VM، توی VMware Workstation این مسیر رو چک کن:

```
VM
→ Settings
→ Options
→ Guest Isolation
```

و مطمئن شو این دو گزینه فعالن:

```
Enable copy and paste
Enable drag and drop
```

بعد داخل لینوکس اینو بزن:

```
systemctl status open-vm-tools
```

اگر `active (running)` بود، سرویس بالاست.

یه نکته مهم: برای Copy/Paste گرافیکی، `open-vm-tools-desktop` مهمه؛ فقط `open-vm-tools` همیشه کافی نیست.

پس بهترین دستور برای تو همینه:

```
sudo apt install open-vm-tools open-vm-tools-desktop -y
```

و بعد reboot.
