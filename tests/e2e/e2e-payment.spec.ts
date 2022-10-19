import {test,expect} from '@playwright/test'
import {closePage,loginPageSuccessfully} from '../../helpers/helper'

test.describe.parallel('Payment flow',()=>{
    test.beforeEach(async ({page})=>{
        await loginPageSuccessfully(page,'username','password')
    })

    test('Add new payment',async ({page})=>{
        await page.locator('#pay_bills_tab').click()
        await page.click('#tabs > ul > li:nth-child(1)')
        await page.selectOption('#sp_payee','bofa')
        await page.selectOption('#sp_account','2')
        await page.type('#sp_amount','1000')
        await page.type('#sp_date','2022-09-19')
        await page.type('#sp_description','Test test')
        await page.click('#pay_saved_payees')
        await expect(page.locator('#alert_content')).toContainText('The payment was successfully submitted.')
    })

    test.afterEach(async({page})=> {
        await closePage(page)
    })
})