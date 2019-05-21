# npm-audit-haphap

Are you also tired of getting "Your configured registry (${opts.registry}) does not support audit requests."
errors from npm audit every now and then?

Don't worry, just switch your npm audit npm script from

`npm audit --json | audit-filter`

to:

`npm-audit-haphap | audit-filter`

And your builds won't break any longer on a flaky audit step. Audit-haphap will return a clean audit report when npm is
not available.