import { closePage,loginPageSuccessfully } from "../helpers/helper";
import {test,expect} from '@playwright/test'

test.describe.parallel('Show Transaction Flow',()=>{
    test.beforeEach(async({page})=>{
        await loginPageSuccessfully(page,'username','password')
    })

    test('Show transaction',async({page})=>{
        await page.click('#account_activity_tab')
        await page.click('#tabs > ul > li:nth-child(1)')
        await page.locator('#aa_accountId').selectOption('2')
        await expect(page.locator('#all_transactions_for_account > table')).toBeVisible()
        await expect(page.locator('#all_transactions_for_account > table > tbody > tr')).toHaveCount(3)
    })

    test('Show transaction in case no result', async({page})=>{
        await page.click('#account_activity_tab')
        await page.click('#tabs > ul > li:nth-child(1)')
        await page.locator('#aa_accountId').selectOption('5')
        await expect(page.locator('#all_transactions_for_account > table')).not.toBeVisible()
        await expect(page.locator('#all_transactions_for_account > .well')).toBeVisible()
        await expect(page.locator('#all_transactions_for_account > .well')).toContainText('No results.')
    })
    test.afterEach(async({page})=>{
        await closePage(page)
    })

})