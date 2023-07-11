https://yarnpkg.com/advanced/error-codes
https://blog.logrocket.com/advanced-package-manager-features-npm-yarn-pnpm/

https://yarnpkg.com/getting-started/migration

Run npm install -g yarn to update the global yarn version to latest v1
Go into your project directory
Run yarn set version berry to enable v2 (cf Install for more details)
If you used .npmrc or .yarnrc, you'll need to turn them into the new format (see also 1, 2)
Add nodeLinker: node-modules in your .yarnrc.yml file
Commit the changes so far (yarn-X.Y.Z.js, .yarnrc.yml, ...)
Run yarn install to migrate the lockfile
Take a look at this article to see what should be gitignored
Commit everything remaining

https://www.reddit.com/r/learnjavascript/comments/k9i50i/pnpm_vs_yarn_2/



Turborepo works with Yarn monorepos, as well as NPM or PNPM.
Yarn workspaces do not natively support features like local caching (or remote caching). 
Any time you run a build, you must recompute that work every time.
With Turbo, it's able to intelligently cache build and log outputs to never recompute work that's already been completed.


https://github.com/TomFern/semaphore-demo-monorepo-typescript
https://medium.com/swlh/getting-started-with-yarn-2-and-typescript-43321a3acdee
https://github.com/saseungmin/yarn-berry-example
https://semaphoreci.com/blog/typescript-monorepos-with-yarn
https://habr.com/ru/company/oleg-bunin/blog/531632/
https://trueengineering.ru/ru/cases/monorepository-vs-polyrepository
https://yarnpkg.com/advanced/architecture
https://ismayilkhayredinov.medium.com/orchestrating-and-dockerizing-a-monorepo-with-yarn-3-and-turborepo-e26241a285cb
https://github.com/pedronauck/yarn-workspaces-example/blob/master/package.json
https://github.com/pedronauck/yarn-workspaces-example
https://www.honeybadger.io/blog/monorepo-yarn-workspace-lerna/
https://blog.nrwl.io/dev-workflow-using-git-submodules-and-yarn-workspaces-14fd06c07964
https://blog.heroku.com/building-a-monorepo-with-yarn-2
https://dev.to/kylejschwartz/migrate-a-js-project-to-yarn-berry-l90
https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/
https://javascript.plainenglish.io/5-best-lerna-alternatives-42ffe75d403e
https://www.velotio.com/engineering-blog/scalable-front-end-with-lerna-yarn-react
https://github.com/Quramy/lerna-yarn-workspaces-example
https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d
https://www.reddit.com/r/javascript/comments/uiq32m/lerna_is_officially_dead_long_live_monorepos/

https://sst.dev/chapters/using-lerna-and-yarn-workspaces-with-serverless.html
https://github.com/nrwl/nx-example-multirepo
https://blog.nrwl.io/dev-workflow-using-git-submodules-and-yarn-workspaces-14fd06c07964
https://stackoverflow.com/questions/63613644/fixing-ts2688-cannot-find-type-definition-file-in-node-modules
https://github.com/saseungmin/yarn-berry-example/blob/main/tsconfig.json
https://blog.logrocket.com/setting-up-monorepo-with-lerna-typescript/
https://blog.logrocket.com/setting-up-monorepo-with-lerna-typescript/
https://psidium.github.io/lerna/monorepo/yarn/nodejs/pnp/zero-install/2021/08/23/migrating-a-monorepo-from-lerna-to-yarn-3.html
https://www.polarsignals.com/blog/posts/2022/02/01/managing-monorepos-with-lerna-and-yarn-workspaces/
https://bit.dev/docs/quick-start/
https://www.honeybadger.io/blog/monorepo-yarn-workspace-lerna/


"compilerOptions": {
...
"typeRoots": ["./node_modules/@types"]
}

# https://codersociety.com/blog/articles/hashicorp-vault-node
# https://rushstack.io/pages/heft/overview/
# https://knowledge.autodesk.com/support/vault-products/troubleshooting/caas/sfdcarticles/sfdcarticles/Troubleshooting-Windows-Authentication-issues-in-Vault.html
# https://github.com/microsoft/rushstack-samples
# monorepo vs polyrepo (https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
# https://earthly.dev/blog/monorepo-vs-polyrepo/
# https://github.com/microsoft/rush-example
# https://classic.yarnpkg.com/lang/en/docs/cli/install/
# https://blog.logrocket.com/setting-up-monorepo-with-lerna-typescript/
# https://blog.heroku.com/building-a-monorepo-with-yarn-2
# https://github.com/saseungmin/yarn-berry-example
