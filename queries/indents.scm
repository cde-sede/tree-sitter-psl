((definition) @indent.begin
	(#set! indent.immediate 1))

((flow_control) @indent.begin
	(#set! indent.immediate 1))

((else_statement) @indent.branch)
((elif_statement) @indent.branch)

(end) @indent.end
