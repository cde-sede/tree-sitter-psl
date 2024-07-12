const builtin_core = ["include"];

module.exports = grammar({
  name: 'pyslang',

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.definition,
      $._tokens,
    ),

    _tokens: $ => choice(
      $.string,
      $.booleans,
      $.char,
      $.number,
      $.builtin,
      $.operand,
      $.comment,
      $.word,
      $.cast,
      $.accessor,
    ),

    string: $ => seq(
      '"',
      repeat(choice(
        alias(token.immediate(prec(1, /[^\\"\n]+/)), $.string_content),
        $.escape_sequence,
      )),
      '"',
    ),

    escape_sequence: _ => token(prec(1, seq(
      '\\',
      choice(
        /[^xuU]/,
        /\d{2,3}/,
        /x[0-9a-fA-F]{2,}/,
        /u[0-9a-fA-F]{4}/,
        /U[0-9a-fA-F]{8}/,
      ),
    ))),

    char: _ => /'\\?.'/,
    number: _ => /\d+/,
    comment: _ => /\/\/.*/,
    cast: _ => /:\w+\**/,

    operand: _ => /[^\w\s"']+/,

    builtin: $ => choice(
      $.function_call,
      $.syscalls,
      $.keyword,
    ),


    definition: $ => choice(
      $.definitions,
      $.flow_control
    ),

    definitions: $ => choice($.memory, $.macro, $.proc),

    macro: $ => seq(
      field('type', "macro"),
      field("name", $.identifier),
      repeat1($._definition),
      field('end', $.end),
    ),

    memory: $ => seq(
      "memory",
      field("name", $.identifier),
      repeat1($._definition),
      field('end', $.end),
    ),

    proc: $ => seq(
      "proc",
      field("name", $.identifier),
      field("in", repeat(seq($.word, $.cast))),
      "in",
      field('out', optional(seq("out", repeat1($.cast)))),
      "do",
      repeat($._definition),
      field('end', $.end),
    ),

    flow_control: $ => choice($._base_flow, $._if_statement),

    _base_flow: $ => seq(
      choice('while', 'let', 'with'),
      repeat1($._definition),
      'do',
      repeat1($._definition),
      field('end', $.end),
    ),

    _if_statement: $ => seq(
      "if",
      repeat1($._definition),
      'do',
      repeat1($._definition),
      optional(repeat($.elif_statement)),
      optional($.else_statement),
      field('end', $.end),
    ),

    elif_statement: $ => seq(
      'elif',
      repeat($._definition),
      'do',
      repeat($._definition),
    ),

    else_statement: $ => seq(
      'else',
      repeat($._definition),
    ),

    booleans: _ => choice('true', 'false'),

    end: _ => 'end',

    function_call: _ => choice(
      'dump',
      'udump',
      'cdump',
      'hexdump',
    ),

    syscalls: _ => choice(
      'syscall',  'rsyscall',
      'syscall1', 'rsyscall1',
      'syscall2', 'rsyscall2',
      'syscall3', 'rsyscall3',
      'syscall4', 'rsyscall4',
      'syscall5', 'rsyscall5',
      'syscall6', 'rsyscall6',
    ),

    keyword: _ => choice(
      'drop',
      'dup',
      'dup2',
      'swap',
      'over',
      'rot',
      'rrot',
      'exit',
      'mem',
      'store',
      'load',
      'blsh',
      'brsh',
      'band',
      'bor',
      'bxor',
    ),

    accessor: _ => seq(
      choice('!', '@'),
      choice(/[^\s"'!?]+/, '8', '16', '32', '64')
    ),

    word: $ => $.identifier,
    identifier: _ => /[^\s"'!?]+/,
  }
});

