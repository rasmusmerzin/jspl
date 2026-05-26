import sys

def print(text):
    sys.stdout.write(text)
    sys.stdout.flush()

def echo(text):
    sys.stdout.write(text)
    sys.stdout.write("\n")
    sys.stdout.flush()

def toString(value):
    return str(value)

def isArray(value):
    return isinstance(value, list)

def isA(value, klass):
    return isinstance(value, klass)


class List:
    def __init__(self, *items):
        self.items = list(items)

    @classmethod
    def of(cls, source):
        if isinstance(source, list):
            return cls(*source)
        if isinstance(source, cls):
            return cls(*source.items)
        return cls(source)

    def __iter__(self):
        return iter(self.items)

    def length(self):
        return len(self.items)

    def at(self, index):
        if index >= len(self.items) or index < -len(self.items):
            return None
        if index < 0:
            index += len(self.items)
        return self.items[index]
