### روش پیشنهادی: مدل 2 VMware Tools

اول در Ubuntu بررسی کن که VMware Tools نصب باشد. معمولاً در VMware Workstation با نصب `open-vm-tools` قابلیت **Copy/Paste و Drag & Drop** فعال می‌شود:

```
sudo apt update
sudo apt install open-vm-tools open-vm-tools-desktop
```

بعد:

```
sudo reboot
```

حالا معمولاً می‌توانی:

**Windows:**

```
Desktop → فایل → Ctrl+C
```

**Ubuntu داخل VMware:**

```
Desktop → Ctrl+V
```

یا حتی فایل را با **Drag & Drop** از Windows به Ubuntu بکش.

---
### توضیحات بیشتر درمورد مدل 1
 -  1-میری داخل ماشین مجازیت اون کد هایه بالا رو میزنی 
 - 2-سپس هر چیو در ویندوز ctl+c بگیری بر اساس شورت کاتی که معمولا  ctl+shift+v است میتونی کپی کنی اون paste درون ویندوز رو درون ترمینالت


---

### اگر Copy/Paste کار نکرد مدل 2

در VMware Workstation برو به:

```
VM
└── Settings
    └── Options
        └── Guest Isolation
```

و این دو گزینه را فعال کن:

```
☑ Enable copy and paste
☑ Enable drag and drop
```

بعد Ubuntu را Restart کن.

---

اگر هدفت **انتقال فایل بین Windows و Ubuntu** است، یک روش حتی بهتر هم هست به اسم **Shared Folders** که باعث می‌شود یک پوشه از Windows داخل Ubuntu مثل یک پوشه معمولی قابل دسترسی باشد.
