from playwright.sync_api import sync_playwright
import os

os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
os.makedirs("/home/jules/verification/videos", exist_ok=True)

def run_cuj(page):
    # Set viewport to mobile to see BottomNav
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Click the Search button in BottomNav
    page.get_by_role("link", name="Search").click()
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
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