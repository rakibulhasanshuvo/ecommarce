from playwright.sync_api import sync_playwright
import re

def run_cuj(page):
    # Go to a product page to add it to cart
    page.goto("http://localhost:3000/products/zenith-air-m2")
    page.wait_for_timeout(3000) # Increased timeout for dev server compilation

    # Add to cart
    page.get_by_role("button", name="Add to Cart").click()
    page.wait_for_timeout(1000)

    # Go to cart and then checkout
    page.goto("http://localhost:3000/checkout")
    page.wait_for_timeout(3000)

    # Fill shipping info
    page.get_by_placeholder("First Name").fill("Security")
    page.get_by_placeholder("Last Name").fill("Tester")
    page.get_by_placeholder("Email Address").fill("security@example.com")
    page.get_by_placeholder("Street Address").fill("123 Secure Ln")
    page.get_by_placeholder("City").fill("Safe City")
    page.get_by_placeholder("ZIP Code").fill("12345")
    page.wait_for_timeout(500)

    # Continue to payment
    page.get_by_role("button", name="Continue to Payment").click()
    page.wait_for_timeout(1000)

    # Fill payment info
    page.get_by_placeholder("Cardholder Name").fill("Security Tester")
    page.get_by_placeholder("Card Number").fill("4111 1111 1111 1111")
    page.get_by_placeholder("MM/YY").fill("12/25")
    page.get_by_placeholder("CVV").fill("123")
    page.wait_for_timeout(500)

    # Place order
    page.get_by_role("button", name=re.compile("Pay")).click()
    page.wait_for_timeout(4000) # wait for the 2 second simulation

    # Extract order number
    success_text = page.locator("p.text-text-secondary").inner_text()
    print(f"Success text: {success_text}")

    match = re.search(r"#(LX-[0-9A-Z]{8})", success_text)
    if match:
        print(f"Verified secure order number: {match.group(1)}")
    else:
        print("COULD NOT FIND SECURE ORDER NUMBER FORMAT!")

    # Take screenshot of the success page
    page.screenshot(path="verification/screenshots/verification_order_security.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("verification/videos", exist_ok=True)
    os.makedirs("verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
