SRC=$(wildcard *.md)
PDF=$(SRC:.md=.pdf)
IMG=$(wildcard img/*)

all: ${PDF}

%.pdf: %.md ${IMG}
	report -n generate -f $< $@
