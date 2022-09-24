import {test,expect} from '@playwright/test'
import { closePage,loginPageSuccessfully } from '../helpers/helper'

test.describe('Transfer funds flow',()=>{
    test.beforeEach(async ({page})=>{
        await loginPageSuccessfully(page,'username','password')
    })

    test('Transfer fund',async ({page})=>{
        await page.locator('#tf_fromAccountId').selectOption('2')
        await page.locator('#tf_toAccountId').selectOption('1')
        await page.type('#tf_amount','1000')
        await page.type('#tf_description','Test 111222')
        await page.click('#btn_submit')
        await expect(page.locator('#tf_fromAccountId')).toBeDisabled()
        await expect(page.locator('#tf_fromAccountId')).toHaveValue('Checking')
        await expect(page.locator('#tf_toAccountId')).toBeDisabled()
        await expect(page.locator('#tf_toAccountId')).toHaveValue('Savings')
        await expect(page.locator('#tf_amount')).toBeDisabled()
        await expect(page.locator('#tf_amount')).toHaveValue('1000')
        await expect(page.locator('#tf_description')).toBeDisabled()
        await expect(page.locator('#tf_description')).toHaveValue('Test 111222')
        await page.click('#btn_submit')
        await expect(page.locator('h2.board-header')).toBeVisible()
        await expect(page.locator('h2.board-header')).toContainText('Transfer Money & Make Payments - Confirm')
        await expect(page.locator('.alert-success')).toContainText('You successfully submitted your transaction.')
    })
    test.afterEach(async ({page})=>{
        await closePage(page)
    })
})