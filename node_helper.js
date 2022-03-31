/* Magic Mirror
 * Module: MMM-FF-process-stats
 *
 * By Michael Trenkler
 * ISC Licensed.
 */

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.getStats();

      if (!this.intervalTimer) {
        this.intervalTimer = setInterval(() => {
          this.getStats();
        }, this.config.updateInterval);
      }
    }
  },

  getStats: function () {
    this.stats = {
      // defaultApp: process.defaultApp,
      // isMainFrame: process.isMainFrame,
      // platform: process.platform,
      // chrome: process.chrome,
      // getCreationTime: process.getCreationTime(),
      // getHeapStatistics: process.getHeapStatistics(),
      // getBlinkMemoryInfo: process.getBlinkMemoryInfo(),
      // getProcessMemoryInfo: process.getProcessMemoryInfo(),
      systemMemoryInfo: process.getSystemMemoryInfo(),
      systemVersion: process.getSystemVersion(),
      CPUUsage: process.getCPUUsage(),
      // getIOCounters: process.getIOCounters(),
      uptime: process.uptime()
      // pid: process.pid,
      // arch: process.arch,
      // sandboxed: process.sandboxed,
      // contextIsolated: process.contextIsolated,
      // type: process.type,
      // version: process.version,
      // versions: process.versions,
      // mas: process.mas
    };

    this.stats = JSON.parse(JSON.stringify(this.stats));

    this.sendSocketNotification("STATS", this.stats);
  }
});
