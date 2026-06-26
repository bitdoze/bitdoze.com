---
date: 2026-06-25T00:00:00Z
title: "How to Benchmark Cloud Servers (VPS)"
description: "Run disk, network, and CPU benchmarks on your VPS using YABS and other tools. Compare providers before you commit."
image: "../../assets/images/benchmark_vps.jpeg"
categories: ["vps"]
authors: ["Dragos"]
tags: ["linux", "vps", "benchmarks"]
canonical: https://www.bitdoze.com/benchmark-cloud-servers/
---

import Button from "../../layouts/components/widgets/Button.astro";

Before picking a VPS provider, run a benchmark. Specs on a pricing page don't tell you much — shared vCPU contention, noisy neighbors, and disk throttling all affect real performance. A quick benchmark shows what you actually get.

This guide covers what to test, which tools to use, and how to read the results.

<Button link="https://go.bitdoze.com/do" text="DigitalOcean $100 Free" />
<Button link="https://go.bitdoze.com/vultr" text="Vultr $100 Free" />
<Button link="https://go.bitdoze.com/hetzner" text="Hetzner €20 Free" />
<Button link="https://go.bitdoze.com/hostinger-vps" text="Hostinger VPS" />

## What to benchmark

Three things matter most on a VPS:

**Disk I/O.** Random read/write speeds with small block sizes (4k) affect databases and web apps directly. Sequential speeds (1m blocks) matter for backups and large file operations. Look for NVMe storage — it's standard on most providers now but some still use SATA SSDs.

**Network throughput.** If you're serving users across regions, test speeds to multiple locations. A server with 10 Gbps uplink but poor peering to your target region is useless. Check both IPv4 and IPv6.

**CPU performance.** Geekbench scores give you a standardized number you can compare across providers. Single-core matters for most web workloads. Multi-core matters if you're running parallel tasks.

## YABS: the one-command benchmark

[YABS](https://github.com/masonr/yet-another-bench-script) (Yet-Another-Bench-Script) runs all three tests in one go. It uses fio for disk, iperf3 for network, and Geekbench 6 for CPU. No installation needed — it downloads portable binaries and runs them.

Run it:

```
curl -sL https://yabs.sh | bash
```

That's it. Takes about 10-15 minutes depending on your server.

**Useful flags:**

- `-r` — reduces iperf locations (less bandwidth usage)
- `-i` — skips network tests entirely
- `-f` — skips disk tests
- `-g` — skips Geekbench
- `-5` — runs Geekbench 5 instead of 6 (for comparing with older results)

You can combine flags: `curl -sL https://yabs.sh | bash -s -- -r` runs a lighter test with fewer network endpoints.

### Reading the output

Here's what a typical run looks like (Hetzner CX33, 4 vCPU AMD EPYC, €6.49/month):

```
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #
#              Yet-Another-Bench-Script              #
#                     v2026-04-20                    #
# https://github.com/masonr/yet-another-bench-script #
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #

Thu Oct 16 11:32:39 AM UTC 2026

Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 30 minutes
Processor  : AMD EPYC-Rome Processor
CPU cores  : 4 @ 2445.404 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ❌ Disabled
RAM        : 7.6 GiB
Swap       : 0.0 KiB
Disk       : 75.0 GiB
Distro     : Ubuntu 24.04.3 LTS
Kernel     : 6.8.0-71-generic
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ✔ Online

fio Disk Speed Tests (Mixed R/W 50/50):
---------------------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ----
Read       | 115.01 MB/s  (28.7k) | 988.49 MB/s  (15.4k)
Write      | 115.32 MB/s  (28.8k) | 993.69 MB/s  (15.5k)
Total      | 230.34 MB/s  (57.5k) | 1.98 GB/s    (30.9k)
           |                      |
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ----
Read       | 1.78 GB/s     (3.4k) | 2.16 GB/s     (2.1k)
Write      | 1.88 GB/s     (3.6k) | 2.30 GB/s     (2.2k)
Total      | 3.66 GB/s     (7.1k) | 4.46 GB/s     (4.3k)

iperf3 Network Speed Tests (IPv4):
---------------------------------
Provider        | Location (Link)           | Send Speed      | Recv Speed      | Ping
-----           | -----                     | ----            | ----            | ----
Clouvider       | London, UK (10G)          | 5.16 Gbits/sec  | 5.60 Gbits/sec  | 17.8 ms
Eranium         | Amsterdam, NL (100G)      | 12.3 Gbits/sec  | 12.8 Gbits/sec  | 9.27 ms
Uztelecom       | Tashkent, UZ (10G)        | 1.96 Gbits/sec  | 2.24 Gbits/sec  | 94.6 ms
Leaseweb        | Singapore, SG (10G)       | 665 Mbits/sec   | 841 Mbits/sec   | 166 ms
Clouvider       | Los Angeles, CA, US (10G) | 1.03 Gbits/sec  | 1.21 Gbits/sec  | 158 ms
Leaseweb        | NYC, NY, US (10G)         | 1.88 Gbits/sec  | 2.53 Gbits/sec  | 97.7 ms
Edgoo           | Sao Paulo, BR (1G)        | 616 Mbits/sec   | 1.14 Gbits/sec  | 219 ms

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value
                |
Single Core     | 1508
Multi Core      | 4919
Full Test       | https://browser.geekbench.com/v6/cpu/14484522

YABS completed in 12 min 35 sec
```

**What to look for in these results:**

- **Disk:** 4k random IOPS above 20k is decent for a shared vCPU plan. The 115 MB/s at 4k block size here is typical for Hetzner's cost-optimized tier. Dedicated or regular plans will be higher.
- **Network:** 12+ Gbps to Amsterdam is excellent — that's nearby. The drop to 841 Mbps to Singapore is expected due to distance. Focus on speeds to regions where your users are.
- **CPU:** Geekbench 6 single-core of 1508 is solid for an EPYC-Rome shared vCPU. For reference, dedicated cores typically score 1800-2200+.

## Other benchmark tools worth knowing

YABS covers the basics, but sometimes you need more detail:

**[bench.sh](https://bench.sh/)** — tests disk and network speed. Faster than YABS, no CPU benchmark. Good for a quick check.

```
wget -qO- bench.sh | bash
```

**[nench](https://github.com/n-st/nench)** — similar to bench.sh but adds CPU tests and dual-stack IPv4/IPv6 speed tests by default.

```
curl -sL nench.sh | bash
```

**[fio](https://github.com/axboe/fio)** — the industry standard for disk benchmarking. YABS uses it internally, but running fio directly lets you customize block sizes, queue depths, and test patterns for your specific workload.

```
fio --randrepeat=1 --ioengine=libaio --direct=1 --gtod_reduce=1 \
  --name=test --filename=test --bs=4k --iodepth=64 --size=1G \
  --readwrite=randrw --rwmixread=75
```

**[Geekbench](https://www.geekbench.com/)** — run it standalone if you only care about CPU scores. Version 6 is current (latest is 6.6 as of February 2026). Scores are standardized and comparable across providers.

**[sysbench](https://github.com/akopytov/sysbench)** — tests CPU, memory, file I/O, and MySQL/PostgreSQL performance. If you're running a database, benchmark it with sysbench before going to production.

## Tips for reliable benchmarks

- **Run tests multiple times.** Shared vCPU performance varies by time of day. Run benchmarks at different hours to see the range.
- **Test during your traffic patterns.** If you'll run production workloads during business hours, benchmark during business hours.
- **Compare same-tier plans.** Don't compare a $4/month shared vCPU against a $40/month dedicated core server. Compare like with like.
- **Check the Geekbench browser.** Search [browser.geekbench.com](https://browser.geekbench.com/) for your provider and plan. Many people post results publicly.
- **Save your results.** YABS outputs a URL you can share. Keep a record so you can compare after provider changes.

## Where to compare providers

These sites collect benchmark results from real users:

- [VPSBenchmarks.com](https://www.vpsbenchmarks.com/) — side-by-side comparisons with real test data
- [VPS Metrics](https://vpsmetrics.com/benchmarks/) — filterable benchmark database
- [LowEndTalk](https://lowendtalk.com/) — community forum where people post YABS results

If you're considering Hetzner specifically, check this [Hetzner Cloud review](https://www.bitdoze.com/hetzner-cloud-review/) with benchmark results across multiple plan tiers.

<Button link="https://go.bitdoze.com/do" text="DigitalOcean $100 Free" />
<Button link="https://go.bitdoze.com/vultr" text="Vultr $100 Free" />
<Button link="https://go.bitdoze.com/hetzner" text="Hetzner €20 Free" />
<Button link="https://go.bitdoze.com/hostinger-vps" text="Hostinger VPS" />
