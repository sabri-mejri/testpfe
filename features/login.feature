Feature: User Authentication

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user enters email "testuser@example.com"
    And the user enters password "Test@1234"
    And the user clicks Sign in
    Then the user should be redirected to the dashboard
    And a welcome message should display "Welcome, Test User"

  Scenario: Failed login with wrong password
    When the user enters email "testuser@example.com"
    And the user enters password "WrongPassword"
    And the user clicks Sign in
    Then an error message "Invalid email or password" should be displayed

  Scenario: Failed login with unregistered email
    When the user enters email "noone@example.com"
    And the user enters password "Test@1234"
    And the user clicks Sign in
    Then an error message "Invalid email or password" should be displayed

  Scenario: Login with empty fields
    When the user clicks Sign in without filling any fields
    Then an error message "Email is required" should be displayed

  Scenario: Logout after successful login
    Given the user is logged in as "testuser@example.com"
    When the user clicks Logout
    Then the user should be redirected to the login page
