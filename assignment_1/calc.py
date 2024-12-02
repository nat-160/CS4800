#!/usr/bin/env python3
# todo: implement decimals
display,operator,operand = 0,None,None

def isOperator(symbol):
  return symbol=='+' or symbol=='-' or symbol=='*' or symbol=='/'
def isNumber(symbol):
  try: return float(symbol) in range(10)
  except ValueError: return False
def isEquals(symbol):
  return symbol=='='
def isClear(symbol):
  return symbol=='c'

def calculate(x, operator, y):
  x,y = float(x),float(y)
  if operator=='+': return x+y
  elif operator=='-': return x-y
  elif operator=='*': return x*y
  else: return x/y

while True:
  print("Display:",display,"Operator:",operator,"Operand:",operand)
  symbol = input("Input:")

  if isClear(symbol):
    display,operator,operand = 0,None,None
  elif display==0 and operator is None and operand is None:
    if isNumber(symbol):
      display = symbol
    elif isOperator(symbol):
      operator = symbol
  elif display!=0 and operator is None and operand is None:
    if isNumber(symbol):
      display = str(display) + str(symbol)
    elif isOperator(symbol):
      operator = symbol
  elif operator is not None and operand is None:
    if isNumber(symbol):
      operand,display = display,symbol
    elif isOperator(symbol):
      operator = symbol
  elif operator is not None and operand is not None:
    if isNumber(symbol):
      display = str(display) + str(symbol)
    if isOperator(symbol):
      display,operator,operand = calculate(operand,operator,display),operator,None
    if isEquals(symbol):
      display,operator,operand = calculate(operand,operator,display),None,None
