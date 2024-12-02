#!/usr/bin/env python3
from tkinter import *

root = Tk()
root.title("Calculator")
display = Label(root, text="0")
display.grid(column=0,row=0,sticky="e")

number, operator, operand = 0.0, None, None

def isOperator(symbol):
  return symbol=='+' or symbol=='-' or symbol=='*' or symbol=='/'
def isNumber(symbol):
  try: return float(symbol) in range(10)
  except ValueError: return False
def isEquals(symbol):
  return symbol=='='
def isClear(symbol):
  return symbol=='c' or symbol=='AC'
def calculate(x, operator, y):
  x,y = float(x),float(y)
  if operator=='+': return x+y
  elif operator=='-': return x-y
  elif operator=='*': return x*y
  else: return x/y

def press(symbol):
  global number, operator, operand
  if isClear(symbol):
    number,operator,operand = 0,None,None
  elif number==0 and operator is None and operand is None:
    if isNumber(symbol):
      number = symbol
    elif isOperator(symbol):
      operator = symbol
  elif number!=0 and operator is None and operand is None:
    if isNumber(symbol):
      number = str(number) + str(symbol)
    elif isOperator(symbol):
      operator = symbol
  elif operator is not None and operand is None:
    if isNumber(symbol):
      operand,number = number,symbol
    elif isOperator(symbol):
      operator = symbol
  elif operator is not None and operand is not None:
    if isNumber(symbol):
      number = str(number) + str(symbol)
    if isOperator(symbol):
      number,operator,operand = calculate(operand,operator,number),operator,None
    if isEquals(symbol):
      number,operator,operand = calculate(operand,operator,number),None,None
  display['text'] = str(number)

def debug():
  global number, operator, operand
  print("Number:",num,"; Operator:",operator,"; Operand:",operand)

def b0(): press("0")
def b1(): press("1")
def b2(): press("2")
def b3(): press("3")
def b4(): press("4")
def b5(): press("5")
def b6(): press("6")
def b7(): press("7")
def b8(): press("8")
def b9(): press("9")
def decimal(): press(".")
def equals(): press("=")
def clear(): press("AC")
def add(): press("+")
def subtract(): press("-")
def multiply(): press("*")
def divide(): press("/")

lower = Frame(root)

numpad = Frame(lower)
Button(numpad, text="0", command=b0).grid(column=1,row=3,sticky="nsew")
Button(numpad, text="1", command=b1).grid(column=0,row=2,sticky="nsew")
Button(numpad, text="2", command=b2).grid(column=1,row=2,sticky="nsew")
Button(numpad, text="3", command=b3).grid(column=2,row=2,sticky="nsew")
Button(numpad, text="4", command=b4).grid(column=0,row=1,sticky="nsew")
Button(numpad, text="5", command=b5).grid(column=1,row=1,sticky="nsew")
Button(numpad, text="6", command=b6).grid(column=2,row=1,sticky="nsew")
Button(numpad, text="7", command=b7).grid(column=0,row=0,sticky="nsew")
Button(numpad, text="8", command=b8).grid(column=1,row=0,sticky="nsew")
Button(numpad, text="9", command=b9).grid(column=2,row=0,sticky="nsew")
Button(numpad, text=".", command=decimal).grid(column=0,row=3,sticky="nsew")
Button(numpad, text="=", command=equals).grid(column=2,row=3,sticky="nsew")
numpad.grid(column=0,row=0)

operators = Frame(lower)
Button(operators, text="AC", command=clear).grid(column=0,row=0,sticky="nsew")
Button(operators, text="+", command=add).grid(column=0,row=1,sticky="nsew")
Button(operators, text="-", command=subtract).grid(column=0,row=2,sticky="nsew")
Button(operators, text="*", command=multiply).grid(column=0,row=3,sticky="nsew")
Button(operators, text="/", command=divide).grid(column=0,row=4,sticky="nsew")
operators.grid(column=1,row=0)

lower.grid(column=0,row=1)

root.mainloop()
