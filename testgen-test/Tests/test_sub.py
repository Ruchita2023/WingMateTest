from Project.sub import *
import unittest

def sub(a, b):
    s = a - b
    return s

class SubtractionTestCase(unittest.TestCase):
    
    def test_positive_numbers(self):
        result = sub(5, 3)
        self.assertEqual(result, 2)

    def test_negative_numbers(self):
        result = sub(-5, -3)
        self.assertEqual(result, -2)

    def test_zero(self):
        result = sub(0, 0)
        self.assertEqual(result, 0)

    def test_positive_and_negative_numbers(self):
        result = sub(5, -3)
        self.assertEqual(result, 8)

    def test_negative_and_positive_numbers(self):
        result = sub(-5, 3)
        self.assertEqual(result, -8)
        
    def test_large_numbers(self):
        result = sub(1000000000, 999999999)
        self.assertEqual(result, 1)

if __name__ == '__main__':
    unittest.main()