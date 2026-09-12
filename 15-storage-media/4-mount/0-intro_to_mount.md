# مفهوم Mount و Unmount در لینوکس

برای فهم Mount باید اول این زنجیره را به یاد داشته باشیم:

```
Disk
 |
Partition
 |
File System
 |
Mount Point
 |
Files
```

مثلاً:

```
/dev/sdb1
    |
   ext4
    |
  /data
    |
 files
```