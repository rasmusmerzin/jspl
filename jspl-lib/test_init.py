from __init__ import *

def test_toString():
    assert(isinstance(toString(1), str))

def test_isArray():
    assert(isArray([]))
    assert(isArray([1]))
    assert(not isArray({ "a": 1 }))
    assert(not isArray("a"))


class TestList:
    def test_construction(self):
        lst = List(1, 2, 3)
        assert(lst.items == [1, 2, 3])
        assert(isA(lst, List))

    def test_from_primitive(self):
        lst = List.of(7)
        assert(lst.items == [7])

    def test_from_array(self):
        lst = List.of([1, 2, 3])
        assert(lst.items == [1, 2, 3])

    def test_from_List(self):
        lst = List.of(List(1, 2, 3))
        assert(lst.items == [1, 2, 3])

    def test_iterable(self):
        lst = List(1, 2, 3)
        assert(list(lst) == [1, 2, 3])
        i = 0
        for item in lst:
            i += 1
            assert(item == i)

    def test_length(self):
        lst = List(1, 2, 3)
        assert(lst.length() == 3)

    def test_at(self):
        lst = List(1, 2, 3)
        assert(lst.at(0) == 1)
        assert(lst.at(1) == 2)
        assert(lst.at(-1) == 3)
        assert(lst.at(-2) == 2)
