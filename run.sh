rm -rf ./allure-results
rm -rf ./playwright-report
rm -rf ./test-results

pnpm install
pnpm exec playwright test
