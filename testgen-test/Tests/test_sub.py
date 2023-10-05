import unittest

class SubtractionTestCase(unittest.TestCase):
    
    def test_positive_numbers(self):
        # Test case for subtracting two positive numbers
        result = sub(5, 3)
        self.assertEqual(result, 2)
    
    def test_negative_numbers(self):
        # Test case for subtracting two negative numbers
        result = sub(-5, -3)
        self.assertEqual(result, -2)
    
    def test_positive_and_negative_numbers(self):
        # Test case for subtracting a positive number from a negative number
        result = sub(-5, 3)
        self.assertEqual(result, -8)
    
    def test_zero(self):
        # Test case for subtracting zero from a number
        result = sub(5, 0)
        self.assertEqual(result, 5)
    
    def test_float_numbers(self):
        # Test case for subtracting two floating point numbers
        result = sub(5.5, 3.3)
        self.assertAlmostEqual(result, 2.2, places=1)
    
    def test_large_numbers(self):
        # Test case for subtracting two large numbers
        result = sub(1000000, 999999)
        self.assertEqual(result, 1)
    
    def test_large_negative_numbers(self):
        # Test case for subtracting two large negative numbers
        result = sub(-1000000, -999999)
        self.assertEqual(result, -1)

unittest.main()