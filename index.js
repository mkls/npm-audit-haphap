#!/usr/bin/env node

const { exec } = require('child_process');
const nspConfig = require('rc')('nsp');

exec('npm audit --json', (error, stdout, stderr) => {
  let auditReport = JSON.parse(stdout);

  if (auditReport.error) {
    if (auditReport.error.code === 'ENOAUDIT') {
      auditReport = cleanAuditReport;
    } else {
      console.error(stderr);
      process.exit(1);
    }
  }
  const arguments = process.argv.slice(2);

  if (arguments.includes('--validate-with-filter')) {
    const failure = handleValidation(auditReport);
    process.exit(failure ? 1 : 0);
  }

  console.log(JSON.stringify(auditReport, null, 2));
});

const handleValidation = (auditReport) => {
  const filteredAdvisories = Object.values(auditReport.advisories).filter(
    advisory => !nspConfig.exceptions.includes(advisory.url)
  );
  const isRemainingAdvisories = filteredAdvisories.length > 0;
  if (isRemainingAdvisories) {
    console.error('Unfiltered advisories found, please check `npm audit`:');
    filteredAdvisories.map(advisory => advisory.url).forEach(url => console.log(`  - ${url}`));
  } else {
    console.log('No unfiltered advisories found');
  }
  console.log('');
  return isRemainingAdvisories;
};

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
