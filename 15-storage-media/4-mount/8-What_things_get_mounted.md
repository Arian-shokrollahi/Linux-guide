# چه چیزهایی Mount می‌شوند؟

فقط هارد نیست:

- ا-Partitionها
- ا-USB
- ا-CD/DVD
- ا-Network File System (NFS)
- ا-RAM File System مثل tmpfs

مثلاً:

```
/dev/sdb1  →  /data

NFS Server → /backup

tmpfs      → /tmp
```