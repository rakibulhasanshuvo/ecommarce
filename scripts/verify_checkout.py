from playwright.sync_api import sync_playwright
import re

def run_cuj(page):
    # Go to a product page to add it to cart
    page.goto("http://localhost:3000/products/zenith-air-m2")
    page.wait_for_timeout(2000)

    # Add to cart
    page.get_by_role("button", name="Add to Cart").click()
    page.wait_for_timeout(1000)

    # Go to cart and then checkout
    page.goto("http://localhost:3000/checkout")
    page.wait_for_timeout(2000)

    # Fill shipping info
    page.get_by_placeholder("First Name").fill("John")
    page.get_by_placeholder("Last Name").fill("Doe")
    page.get_by_placeholder("Email Address").fill("john@example.com")
    page.get_by_placeholder("Street Address").fill("123 Main St")
    page.get_by_placeholder("City").fill("Anytown")
    page.get_by_placeholder("ZIP Code").fill("12345")
    page.wait_for_timeout(500)

    # Continue to payment
    page.get_by_role("button", name="Continue to Payment").click()
    page.wait_for_timeout(1000)

    # Fill payment info
    page.get_by_placeholder("Cardholder Name").fill("John Doe")
    page.get_by_placeholder("Card Number").fill("4111 1111 1111 1111")
    page.get_by_placeholder("MM/YY").fill("12/25")
    page.get_by_placeholder("CVV").fill("123")
    page.wait_for_timeout(500)

    # Place order
    page.get_by_role("button", name=re.compile("Pay")).click()
    page.wait_for_timeout(4000) # wait for the 2 second simulation

    # Take screenshot of the success page
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
