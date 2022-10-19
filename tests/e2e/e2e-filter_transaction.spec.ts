import {test,expect} from '@playwright/test'
import { closePage,loginPageSuccessfully } from '../../helpers/helper'

test.describe.parallel('Filter Transaction flow',()=>{
    test.beforeEach(async ({page})=>{
        await loginPageSuccessfully(page,'username','password')
    })

    test('Filter Transaction',async ({page})=>{
        await page.click('#account_activity_tab')
        await page.click('#tabs > ul > li:nth-child(2)')
        await page.type('#aa_description','ONLINE TRANSFER REF #UKKSDRQG6L')
        await page.click('button[type="submit"]')
        await page.locator('#filtered_transactions_for_account > table').isVisible()
        const elements = await page.$$('#filtered_transactions_for_account > table > tbody > tr')
        for(var i=1;i <= elements.length;i++){
            await expect(page.locator('#filtered_transactions_for_account > table > tbody > tr:nth-child('+i+') > td:nth-child(2)')).toContainText('ONLINE TRANSFER REF #UKKSDRQG6L')
        }
    })

    test.afterEach(async ({page})=>{
        await closePage(page)
    })
})