#!/usr/bin/env node

/*
Usage: yarn build [component name...] [options] [lerna options]

  By default, only updated packages will be built.
  All lerna options will be forwarded onto lerna commands.

  Options:

    [component name...]       space separated list of package names to build
    -a, --all                 build all packages
*/

const { spawnSync } = require('child_process')

const getPackageNames = require('./utils/getPackageNames')
const arrayToGlob = require('./utils/arrayToGlob')

getPackageNames(packageNames => {
  const scopeGlob = arrayToGlob(packageNames)

  spawnSync('npx', ['lerna', 'clean', '--yes'], { stdio: 'inherit' })

  spawnSync(
    'npx',
    [
      'lerna',
      'exec',
      '--scope',
      scopeGlob,
      '--ignore',
      '@tds/shared-*',
      '--',
      '$LERNA_ROOT_PATH/scripts/build.sh',
    ],
    {
      stdio: 'inherit',
    }
  )
  spawnSync('npx', ['lerna', 'run', '--scope', scopeGlob, '--ignore', '@tds/shared-*', 'build'], {
    stdio: 'inherit',
  })
})
