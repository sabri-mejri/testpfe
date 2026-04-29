Feature: Checkout Process

  Background:
    Given the user is logged in
    And the user has items in the cart

  Scenario: Successful order placement with valid payment
    When the user navigates to checkout
    And the user fills in the shipping address
      | street         | city     | zip   | country |
      | 12 Main Street | Tunis    | 1000  | TN      |
    And the user fills in payment details
      | card_number      | expiry | cvv |
      | 4111111111111111 | 12/26  | 123 |
    And the user places the order
    Then an order confirmation should be displayed
    And the order total should be "$99.99"

  Scenario: Checkout fails with expired card
    When the user navigates to checkout
    And the user fills in the shipping address
      | street         | city  | zip  | country |
      | 5 Avenue Habib | Tunis | 1002 | TN      |
    And the user fills in payment details
      | card_number      | expiry | cvv |
      | 4111111111111111 | 01/20  | 123 |
    And the user places the order
    Then a payment error "Card expired" should be displayed

  Scenario: Checkout fails with missing shipping fields
    When the user navigates to checkout
    And the user clicks Place Order without filling shipping address
    Then a validation error "Street address is required" should be displayed
