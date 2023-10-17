from Project.mul import *
Here is a set of test cases that cover all possible scenarios for the given code snippet:

```python
import unittest

def mul(a,b):
    s = a * b
    return s

class TestMulFunction(unittest.TestCase):
    def test_positive_numbers(self):
        result = mul(3, 4)
        self.assertEqual(result, 12)

    def test_negative_numbers(self):
        result = mul(-2, -5)
        self.assertEqual(result, 10)

    def test_zero(self):
        result = mul(0, 10)
        self.assertEqual(result, 0)

    def test_one_negative_number(self):
        result = mul(-3, 7)
        self.assertEqual(result, -21)

    def test_one_zero_number(self):
        result = mul(5, 0)
        self.assertEqual(result, 0)

    def test_both_zero_numbers(self):
        result = mul(0, 0)
        self.assertEqual(result, 0)

if __name__ == '__main__':
    unittest.main()