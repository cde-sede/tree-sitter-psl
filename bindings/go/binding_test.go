package tree_sitter_pyslang_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-pyslang"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_pyslang.Language())
	if language == nil {
		t.Errorf("Error loading Pyslang grammar")
	}
}
