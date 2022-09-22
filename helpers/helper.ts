export async function loadPage(page) {
    await page.goto('http://zero.webappsecurity.com/index.html')
}

export async function closePage(page) {
    await page.close()
}