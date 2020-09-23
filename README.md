# npm-audit-haphap

Are you also tired of getting "Your configured registry (https://registry.npmjs.org/) does not support audit requests."
errors from npm audit every now and then?

Don't worry, just switch your npm audit npm script from

`npm audit --json | audit-filter`

to:

`npm-audit-haphap | audit-filter`

And your builds won't break any longer on a flaky audit step. Audit-haphap will return a clean audit report when npm is
not available.

## Validate with exception filtering

You can also check if you have any unresolved advisories running:

`npm-audit-haphap --validate-with-filter`

Should remaining advisories be found, it exits with error code 1.

It also reads your `.nsprc` file for exceptions, so you can exclude advisories until you solve them:

Example `.nsprc` file:
```
{
  "exceptions": [
    "https://npmjs.com/advisories/1523",
    "https://npmjs.com/advisories/1556"
  ]
}
```


