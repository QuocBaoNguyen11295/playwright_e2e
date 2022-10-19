import {test,expect} from '@playwright/test'
import {loadPage,closePage} from '../../helpers/helper'

test.describe.parallel('Search keyword',()=>{
    test.beforeEach(async({page})=>{
        await loadPage(page)
    })

    test('Search the non-existing keyword',async ({page})=>{
        var keyword = 'anything'
        await page.type('#searchTerm',keyword)
        await page.keyboard.press('Enter')
        await expect(page.locator('.container > .top_offset')).toContainText('No results were found for the query: '+keyword)
    })

    test('Search the existing keyword',async ({page})=>{
        var keyword = 'Zero'
        await page.type('#searchTerm',keyword)
        await page.keyboard.press('Enter')
        await expect(page.locator('.container > .top_offset')).toContainText('The following pages were found for the query: '+keyword)
        const elements = await page.$$('.container > .top_offset > ul > li')
        expect(elements.length).toBeGreaterThan(0)
    })
    test.afterEach(async({page})=>{
        await closePage(page)
    })
})