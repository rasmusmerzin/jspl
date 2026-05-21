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
