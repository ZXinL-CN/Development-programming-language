/**
 * 第1节
 * 本节的目的是迅速的实现一个最精简的语言的功能，让你了解一门计算机语言的骨架。
 * 知识点：
 * 1.递归下降的方法做词法分析；
 * 2.语义分析中的引用消解（找到函数的定义）；
 * 3.通过遍历AST的方法，执行程序。
 *
 * 本节采用的语法规则是极其精简的，只能定义函数和调用函数。定义函数的时候，还不能有参数。
 * prog = (functionDecl | functionCall)* ;
 * functionDecl: "function" Identifier "(" ")"  functionBody;
 * functionBody : '{' functionCall* '}' ;
 * functionCall : Identifier '(' parameterList? ')' ;
 * parameterList : StringLiteral (',' StringLiteral)* ;
 */

/////////////////////////////////////////////////////////////////////////
// 词法分析
// 本节没有提供词法分析器，直接提供了一个Token串。语法分析程序可以从Token串中依次读出
// 一个个Token，也可以重新定位Token串的当前读取位置。

// Token的类型
enum TokenKind { Keyword, Identifier, StringLiteral, Seperator, Operator, EOF };

// 代表一个Token的数据结构
interface Token {
  kind: TokenKind;
  text: string;
}

// 一个Token数组，代表了下面这段程序做完词法分析后的结果：
/*
//一个函数的声明，这个函数很简单，只打印"Hello World!"
function sayHello(){
    println("Hello World!");
}
//调用刚才声明的函数
sayHello();
*/

let tokenArray: Token[] = [
  { kind: TokenKind.Keyword, text: 'function' },
  { kind: TokenKind.Identifier, text: 'sayHello' },
  { kind: TokenKind.Seperator, text: '(' },
  { kind: TokenKind.Seperator, text: ')' },
  { kind: TokenKind.Seperator, text: '{' },
  { kind: TokenKind.Identifier, text: 'println' },
  { kind: TokenKind.Seperator, text: '(' },
  { kind: TokenKind.StringLiteral, text: 'Hello World!' },
  { kind: TokenKind.Seperator, text: ')' },
  { kind: TokenKind.Seperator, text: ';' },
  { kind: TokenKind.Seperator, text: '}' },
  { kind: TokenKind.Identifier, text: 'sayHello' },
  { kind: TokenKind.Seperator, text: '(' },
  { kind: TokenKind.Seperator, text: ')' },
  { kind: TokenKind.Seperator, text: ';' },
  { kind: TokenKind.EOF, text: '' }
];

class Tokenizer {
  private tokens: Token[] = [];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  next(): Token {
    if (this.pos <= this.tokens.length) {
      return this.tokens[this.pos++];
    } else {
      // 如果已经到了末尾,总是返回EOF
      return this.tokens[this.pos];
    }
  }
  position(): number {
    return this.pos;
  }
  traceBack(newPos: number): void {
    this.pos = newPos
  }
}

 
/////////////////////////////////////////////////////////////////////////
// 语法分析
// 包括了AST的数据结构和递归下降的语法解析程序

/** 
 * 基类
*/
abstract class AstNdoe {
  // 打印对象信息   
}