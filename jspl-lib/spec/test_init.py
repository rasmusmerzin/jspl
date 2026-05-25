import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from __init__ import toString

def test_toString():
    assert(isinstance(toString(1), str))
