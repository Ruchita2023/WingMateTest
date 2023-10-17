from Project.Folder.add import *
import unittest

def add(a, b):
    s = a + b
    return s

class TestAdd(unittest.TestCase):
    def test_add_positive_numbers(self):
        result = add(2, 3)
        self.assertEqual(result, 5)

    def test_add_negative_numbers(self):
        result = add(-2, -3)
        self.assertEqual(result, -5)

    def test_add_zero(self):
        result = add(0, 0)
        self.assertEqual(result, 0)

    def test_add_positive_and_negative_numbers(self):
        result = add(2, -3)
        self.assertEqual(result, -1)

    def test_add_float_numbers(self):
        result = add(2.5, 3.5)
        self.assertAlmostEqual(result, 6.0)

    def test_add_large_numbers(self):
        result = add(1000000000, 2000000000)
        self.assertEqual(result, 3000000000)

if __name__ == '__main__':
    unittest.main()