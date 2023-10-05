import unittest

class TestSub(unittest.TestCase):
    
    def test_positive_numbers(self):
        """
        Test case to subtract two positive numbers.
        """
        result = sub(10, 5)
        self.assertEqual(result, 5)
    
    def test_negative_numbers(self):
        """
        Test case to subtract two negative numbers.
        """
        result = sub(-10, -5)
        self.assertEqual(result, -5)
    
    def test_positive_and_negative_numbers(self):
        """
        Test case to subtract a positive number from a negative number.
        """
        result = sub(-10, 5)
        self.assertEqual(result, -15)
    
    def test_zero(self):
        """
        Test case to subtract zero from a number.
        """
        result = sub(10, 0)
        self.assertEqual(result, 10)

if __name__ == '__main__':
    unittest.main()