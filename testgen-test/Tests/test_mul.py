import unittest

class TestMul(unittest.TestCase):
    def test_mul_positive_numbers(self):
        # Test when both numbers are positive
        result = mul(5, 10)
        self.assertEqual(result, 50)
    
    def test_mul_negative_numbers(self):
        # Test when both numbers are negative
        result = mul(-5, -10)
        self.assertEqual(result, 50)
    
    def test_mul_positive_and_negative_numbers(self):
        # Test when one number is positive and the other is negative
        result = mul(5, -10)
        self.assertEqual(result, -50)
    
    def test_mul_zero(self):
        # Test when one number is zero
        result = mul(5, 0)
        self.assertEqual(result, 0)
    
    def test_mul_float_numbers(self):
        # Test when both numbers are float
        result = mul(2.5, 3.5)
        self.assertEqual(result, 8.75)
    
    def test_mul_large_numbers(self):
        # Test when both numbers are large
        result = mul(1000000, 1000000)
        self.assertEqual(result, 1000000000000)
    
if __name__ == '__main__':
    unittest.main()