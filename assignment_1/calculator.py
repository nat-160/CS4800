#!/usr/bin/env python3
from tkinter import *

root = Tk()
root.title("Calculator")

display = Label(root, text="0")
display.grid(column=0,row=0,sticky="e")

num, operator, last = 0.0, "nil", "nil"

def isOperator(input):
  return input=="+" or input=="-" or input=="*" or input=="/"

def press(input):
  global num, operator, last
  debug()
  print("Button pressed:",input)
  t = display['text']
  if input == "AC":
    num, operator, last = 0.0, "nil", "nil"
  elif operator == "nil":
    if input == "." and not "." in t:
      display['text'] = t + "."
    elif "0" <= input and input <= "9":
      if t == "0":
        display['text'] = input
      else:
        display['text'] = t + input
    elif isOperator(input):
      operator = input
  elif operator != "nil" and isOperator(last):
    if isOperator(input):
      operator = input
    elif input == "=":
      None
    else:
      num = float(t)
      display['text'] = input
  elif operator != "nil" and last != "=":
    if isOperator(input):
      solve()
      operator = input
    elif input == "." and not "." in t:
      display['text'] = t + "."
    elif "0" <= input and input <= "9":
      display['text'] = t + input
    else:
      solve(2)
      display['text'] = fuck
  else:
    if isOperator(input):
      operator = input
    elif input == "=":
      solve(2)
    else:
      num = display['text'] = input
      operator = "nil"
  last = input
  debug()

def debug():
  print("Num:",num,"; Operator:",operator,"; Last:",last)

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
