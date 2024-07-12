(identifier) @function

(number) @number
(booleans) @boolean
(operand) @operator
(keyword) @keyword.macro
(function_call) @keyword.macro
(cast) @type


(flow_control end: (end) @keyword.repeat) @keyword.repeat
(memory name: (identifier) @function end: (end) @keyword.function) @keyword.function
(macro name: (identifier) @function end: (end) @keyword.function) @keyword.function
(proc name: (identifier) @function end: (end) @keyword.function) @keyword.function

(char) @character
(string) @string
(syscalls) @keyword.builtin
(comment) @comment
(accessor) @property

"exit" @keyword.return
"do" @keyword
(end) @keyword
