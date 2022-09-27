import {test,expect} from '@playwright/test'
import { closePage,loginPageSuccessfully } from '../helpers/helper'

test.describe.parallel('Exchange currency flow',()=>{
    test.beforeEach(async ({page})=>{
        await loginPageSuccessfully(page,'username','password')
    })

    test('Exchange currency',async ({page})=>{
        await page.click('#pay_bills_tab')
        await page.click('#tabs > ul > li:nth-child(3)')
        await page.selectOption('#pc_currency','CHF')
        await page.type('#pc_amount','1000')
        await expect(page.locator('#sp_sell_rate')).toContainText('1 franc (CHF) = 1.1383 U.S. dollar (USD)')
        await page.check('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        await expect(page.locator('#pc_conversion_amount')).toContainText('878.50 franc (CHF) = 1000.00 U.S. dollar (USD)')
        await page.locator('#purchase_cash').click()
        await expect(page.locator('#alert_content')).toBeVisible()
        await expect(page.locator('#alert_content')).toContainText('Foreign currency cash was successfully purchased.')
    })

    test.afterEach(async ({page})=>{
        await closePage(page)
    })
})