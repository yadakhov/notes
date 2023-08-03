" Enable syntax highlighting
syntax on

" Set the tab width and use spaces instead of tabs for indentation
set tabstop=2
set shiftwidth=2
set expandtab

set backspace=indent,eol,start

" Highlight matching brackets and parentheses
set showmatch

" Enable line numbering
set number relativenumber


" Set the default encoding to UTF-8
set encoding=utf-8

set nocompatible

filetype on
filetype plugin on
filetype indent on

let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'
