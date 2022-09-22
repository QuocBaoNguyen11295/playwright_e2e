import { test,expect }from '@playwright/test'
import { loadPage,closePage } from '../helpers/helper'

test.describe.parallel('Feedback form flow',()=>{
    test.beforeEach(async ({page})=>{
        await loadPage(page)
    })

    test('Reset feedback form',async ({page})=>{
        await page.click('#feedback')
        await page.type('#name','Quoc Bao Nguyen')
        await page.type('#email','nqb11295@gmail.com')
        await page.type('#subject','Test Feedback')
        await page.type('#comment','Test Test Test')
        await page.click('input[value="Clear"]')
        await expect(page.locator('#name')).toBeEmpty()
        await expect(page.locator('#email')).toBeEmpty()
        await expect(page.locator('#subject')).toBeEmpty()
        await expect(page.locator('#comment')).toBeEmpty()
    })

    test('Submit form',async ({page})=>{
        await page.click('#feedback')
        var name = 'Quoc Bao Nguyen'
        await page.type('#name',name)
        await page.type('#email','nqb11295@gmail.com')
        await page.type('#subject','Test Feedback')
        await page.type('#comment','Test Test Test')
        await page.click('input[value="Send Message"]')
        await expect(page.locator('#feedback-title')).toContainText('Feedback')
        await expect(page.locator('.container > .top_offset > div > div')).toContainText('Thank you for your comments, '+name+'. They will be reviewed by our Customer Service staff and given the full attention that they deserve.')
    })

    test.afterEach(async ({page})=>{
        await closePage(page)
    })
})