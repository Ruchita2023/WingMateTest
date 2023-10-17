from Project.Folder.add import *
import unittest

def add(a, b):
    s = a + b
    return s

class TestAdd(unittest.TestCase):
    def test_add_positive_numbers(self):
        result = add(3, 5)
        self.assertEqual(result, 8)

    def test_add_negative_numbers(self):
        result = add(-3, -5)
        self.assertEqual(result, -8)

    def test_add_zero(self):
        result = add(0, 5)
        self.assertEqual(result, 5)

    def test_add_large_numbers(self):
        result = add(9999999999, 1)
        self.assertEqual(result, 10000000000)

    def test_add_decimals(self):
        result = add(1.5, 2.5)
        self.assertEqual(result, 4.0)

if __name__ == '__main__':
    unittest.main()