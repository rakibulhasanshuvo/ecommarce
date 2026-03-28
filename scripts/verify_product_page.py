from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to a product page
    page.goto("http://localhost:3000/products/luxe-pro-watch-4")
    page.wait_for_timeout(1000)

    # Wait for the main elements to load to ensure data is fetched correctly
    page.wait_for_selector("h1:has-text('Luxe Pro Watch 4')")
    page.wait_for_timeout(500)

    # Take screenshot of the product page
    page.screenshot(path="/home/jules/verification/screenshots/product_page.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
