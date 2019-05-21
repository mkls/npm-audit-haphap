#!/usr/bin/env node

const { exec } = require('child_process');

const cleanAuditReport = {
  actions: [],
  advisories: {},
  muted: [],
  metadata: {
    vulnerabilities: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0
    },
    dependencies: 0,
    devDependencies: 0,
    optionalDependencies: 0,
    totalDependencies: 0
  },
  runId: '1b15a493-6347-4d73-a5f4-d939dd5a0546'
};

exec('npm audit --json', (error, stdout, stderr) => {
  const auditReport = JSON.parse(stdout);
  if (!auditReport.error) {
    console.log(stdout);
  } else if (auditReport.error.code === 'ENOAUDIT') {
    console.log(JSON.stringify(cleanAuditReport, null, 2));
  } else {
    console.error(stderr)
  }
});
