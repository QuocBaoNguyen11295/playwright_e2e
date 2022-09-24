export async function loadPage(page) {
    await page.goto('http://zero.webappsecurity.com/index.html')
}
export async function loginPageSuccessfully(page, username, password) {
    await loadPage(page)
    await page.click('#signin_button')
    await page.type('#user_login',username)
    await page.type('#user_password',password)
    await page.check('#user_remember_me')
    await page.click('input[name="submit"]')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
}
export async function closePage(page) {
    await page.close()
}