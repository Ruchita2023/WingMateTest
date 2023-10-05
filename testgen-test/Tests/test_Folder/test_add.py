import unittest

class TestAddFunction(unittest.TestCase):

    def test_positive_numbers(self):
        # Test case for adding two positive numbers
        result = add(5, 10)
        self.assertEqual(result, 15)

    def test_negative_numbers(self):
        # Test case for adding two negative numbers
        result = add(-5, -10)
        self.assertEqual(result, -15)

    def test_positive_and_negative_numbers(self):
        # Test case for adding a positive number and a negative number
        result = add(5, -10)
        self.assertEqual(result, -5)

    def test_zero(self):
        # Test case for adding zero to a number
        result = add(5, 0)
        self.assertEqual(result, 5)

    def test_communicative_property(self):
        # Test case for checking the communicative property of addition
        result1 = add(5, 10)
        result2 = add(10, 5)
        self.assertEqual(result1, result2)

if __name__ == '__main__':
    unittest.main()