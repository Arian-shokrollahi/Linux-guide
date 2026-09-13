ا-**Partition Table روی خودِ Disk قرار می‌گیره، نه روی Partition.**

مثلاً:

```
/dev/sdb          ← Disk
│
├── Partition Table (GPT)
│
├── /dev/sdb1     ← Partition
├── /dev/sdb2     ← Partition
└── /dev/sdb3     ← Partition
```

یعنی وقتی می‌نویسی:

```
fdisk -l /dev/sdb
```

داری از **خود Disk `/dev/sdb`** می‌پرسی که چه Partition Tableای دارد.

یا:

```
parted /dev/sdb print
```

باز هم `/dev/sdb` خود **Disk** است.

### پس این تفکیک را یادت باشد:

```
Disk
 ↓
Partition Table (GPT / MBR)
 ↓
Partitions
 ↓
Filesystem (ext4 / xfs / ...)
 ↓
Mount Point
```

مثلاً:

```
/dev/sdb
   │
   ├── GPT
   │
   ├── /dev/sdb1 → ext4 → /data
   └── /dev/sdb2 → xfs  → /backup
```

پس **GPT/MBR مربوط به Disk است، ext4/xfs مربوط به Partition است.**


