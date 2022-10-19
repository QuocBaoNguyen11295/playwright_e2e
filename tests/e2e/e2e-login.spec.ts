import { test,expect } from '@playwright/test'
import { loadPage,closePage } from '../../helpers/helper'
test.describe.parallel('Login/logout flow',()=>{
    test.beforeEach(async ({ page })=>{
        await loadPage(page)
    })

    test('login unsuccessfully', async ({ page })=>{
        await page.click('#signin_button')
        await page.type('#user_login','invalid username')
        await page.type('#user_password','invalid password')
        await page.check('#user_remember_me')
        await page.click('input[value="Sign in"]')
        const message = await page.locator('.alert-error')
        await expect(message).toBeVisible()
        await expect(message).toContainText('Login and/or password are wrong.')
    })

    test('Login and logout successfully',async ({ page })=>{
        await page.click('#signin_button')
        await page.type('#user_login','username')
        await page.type('#user_password','password')
        await page.check('#user_remember_me')
        await page.click('input[value="Sign in"]')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const element = await page.locator('#account_summary_tab')
        await expect(element).toBeVisible()
        await page.click('#settingsBox > ul > li:nth-child(3n)')
        await page.click('#settingsBox > ul > li:nth-child(3n) > ul > li:nth-child(3n)')
        await expect(page.locator('#signin_button')).toBeVisible()
    })

    test.afterEach(async ({page})=>{
        await closePage(page)
    })
})