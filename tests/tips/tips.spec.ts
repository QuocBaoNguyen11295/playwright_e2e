import {test,expect}from '@playwright/test'

test.describe.only('Tips & Tricks Section',()=>{
    test('Test info for Object',async ({page}, testInfo)=>{
        await page.goto('https://example.com/')
        await expect(testInfo.title).toContain('Test info for Object')
    })

    test('Test Skip Browser',async({page,browserName})=>{
        test.skip(browserName === 'chromium','Feature is not ready to test on Chrome')
        await page.goto('https://example.com/')
    })

    test('Test fix me',async ({page,browserName},testInfo)=>{
        test.fixme(browserName === 'chromium','Feature need to reviewed')
        await page.goto('https://example.com/')
        await expect(testInfo.title).toContain('Test fix me')
    })

    test('Mouse movement simulation',async({page})=>{
        await page.goto('https://example.com/')
        await page.mouse.move(0,0)
        await page.mouse.up()
        await page.mouse.move(0,100)
        await page.mouse.down()
    })

    test.only('Multiple browsers inside one browser',async({browser})=>{
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto('https://example.com/')
        await page2.goto('https://example.com/')
        await page3.goto('https://example.com/')
        await page1.waitForTimeout(3000)
    })
})