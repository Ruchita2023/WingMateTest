import unittest

# Define a test class
class TestAddFunction(unittest.TestCase):

    # Test case 1: Test addition of two positive integers
    def test_add_positive_integers(self):
        # Input values
        a = 5
        b = 10
        # Expected output
        expected_output = 15
        # Call the function under test
        result = add(a, b)
        # Check if the result matches the expected output
        self.assertEqual(result, expected_output)

    # Test case 2: Test addition of two negative integers
    def test_add_negative_integers(self):
        # Input values
        a = -5
        b = -10
        # Expected output
        expected_output = -15
        # Call the function under test
        result = add(a, b)
        # Check if the result matches the expected output
        self.assertEqual(result, expected_output)

    # Test case 3: Test addition of a positive and a negative integer
    def test_add_positive_and_negative_integer(self):
        # Input values
        a = 5
        b = -10
        # Expected output
        expected_output = -5
        # Call the function under test
        result = add(a, b)
        # Check if the result matches the expected output
        self.assertEqual(result, expected_output)

    # Test case 4: Test addition of two floating-point numbers
    def test_add_floating_point_numbers(self):
        # Input values
        a = 3.14
        b = 1.5
        # Expected output
        expected_output = 4.64
        # Call the function under test
        result = add(a, b)
        # Check if the result matches the expected output
        self.assertEqual(result, expected_output)

# Run the unit tests
if __name__ == '__main__':
    unittest.main()